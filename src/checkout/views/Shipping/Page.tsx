import * as React from "react";
import { generatePath } from "react-router";

import {
  FormAddressType,
  OverlayContext,
  OverlayTheme,
  OverlayType
} from "../../../components";
import { CartLineInterface } from "../../../components/CartProvider/context";
import { maybe } from "../../../core/utils";
import {
  CartSummary,
  GuestAddressForm,
  ShippingUnavailableModal,
  Steps,
  UserAddressSelector
} from "../../components";
import { CheckoutStep } from "../../context";
import { shippingOptionsUrl } from "../../routes";
import { ICheckoutData, ICheckoutUserArgs } from "../../types";
import { IShippingPageProps, IShippingPageState } from "./types";

const computeCheckoutData = (
  data: FormAddressType,
  lines: CartLineInterface[],
  email?: string
): ICheckoutData => ({
  email: data.email || email,
  shippingAddress: {
    city: data.city,
    companyName: data.companyName,
    country: data.country.value || data.country.code,
    countryArea: data.countryArea,
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    postalCode: data.postalCode,
    streetAddress1: data.streetAddress1,
    streetAddress2: data.streetAddress2,
  },
  ...(lines && {
    lines: lines.map(({ quantity, variantId }) => ({
      quantity,
      variantId,
    })),
  }),
});

class Page extends React.Component<IShippingPageProps, IShippingPageState> {
  readonly state = {
    checkout: null,
    loading: false,
    shippingUnavailable: false,
  };

  proceedToShippingOptions = () => {
    const { update, history, token } = this.props.proceedToNextStepData;
    const canProceed =
      !this.getErrors().length && !this.state.shippingUnavailable;

    if (this.state.shippingUnavailable) {
      return this.renderShippingUnavailableModal();
    }

    if (canProceed) {
      update({
        checkout: this.state.checkout || this.props.checkout,
      });
      history.push(
        generatePath(shippingOptionsUrl, {
          token,
        })
      );
    }
  };

  onProceedToShippingSubmit = async (formData: FormAddressType) => {
    await this.onSubmitHandler(formData);
    this.proceedToShippingOptions();
  };

  onShippingSubmit = (address: FormAddressType): Promise<any> => {
    const {
      checkoutId,
      createCheckout,
      user,
      lines,
      update,
      updateShippingAddress,
    } = this.props;
    const email = maybe(() => user.email, null);
    update({
      shippingAsBilling: maybe(() => address.asBilling, false),
    });

    const [create] = createCheckout;
    const [updateAddress] = updateShippingAddress;

    if (!checkoutId) {
      const data = computeCheckoutData(address, lines);
      return create({
        checkoutInput: {
          email: data.email,
          lines: data.lines,
          shippingAddress: data.shippingAddress,
        },
      });
    }
    const data = computeCheckoutData(address, null, email);
    return updateAddress({
      checkoutId,
      email: data.email,
      shippingAddress: data.shippingAddress,
    });
  };

  getErrors = () => {
    const {
      createCheckout: [, { error: createCheckoutError }],
      updateShippingAddress: [, { error: updateAddressError }],
    } = this.props;
    return (
      maybe(() => createCheckoutError.extraInfo.userInputErrors, []) ||
      maybe(() => updateAddressError.extraInfo.userInputErrors, [])
    );
  };

  onSubmitHandler = async (address: FormAddressType) => {
    this.setState({ loading: true });
    const { checkout } = this.props;

    const result = await this.onShippingSubmit(address);
    const updatedCheckout = maybe(() => result.data.checkout, null);

    this.setState({
      checkout: updatedCheckout || checkout,
      loading: false,
      shippingUnavailable:
        (checkout && !checkout.availableShippingMethods.length) || false,
    });
    return this.getErrors();
  };

  renderShippingUnavailableModal = () => (
    <OverlayContext.Consumer>
      {overlay => (
        <>
          {overlay.show(OverlayType.modal, OverlayTheme.modal, {
            content: <ShippingUnavailableModal hide={overlay.hide} />,
          })}
          ;
        </>
      )}
    </OverlayContext.Consumer>
  );

  getShippingProps = (userCheckoutData: ICheckoutUserArgs) => ({
    buttonText: "Continue to Shipping",
    errors: this.getErrors(),
    loading: this.state.loading,
    proceedToNextStep: this.onProceedToShippingSubmit,
    ...userCheckoutData,
  });

  render() {
    const { checkout, proceedToNextStepData, shop, user, update } = this.props;

    const shippingProps = this.getShippingProps({
      checkout,
      user,
    });

    return (
      <CartSummary checkout={checkout}>
        <div className="checkout-shipping">
          <Steps
            step={CheckoutStep.ShippingAddress}
            token={proceedToNextStepData.token}
            checkout={checkout}
          >
            {user ? (
              <UserAddressSelector
                {...shippingProps}
                update={update}
                onSubmit={this.onSubmitHandler}
                type="shipping"
              />
            ) : (
              <GuestAddressForm {...shippingProps} shop={shop} />
            )}
          </Steps>
        </div>
      </CartSummary>
    );
  }
}

export default Page;
