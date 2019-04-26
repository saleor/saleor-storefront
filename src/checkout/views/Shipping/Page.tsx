import * as React from "react";
import { generatePath } from "react-router";

import {
  FormAddressType,
  OverlayContext,
  OverlayTheme,
  OverlayType
} from "../../../components";
import { CartLineInterface } from "../../../components/CartProvider/context";
import { findFormErrors, maybe } from "../../../core/utils";
import {
  CartSummary,
  GuestAddressForm,
  ShippingUnavailableModal,
  Steps,
  UserAddressSelector
} from "../../components";
import { CheckoutStep } from "../../context";
import { shippingOptionsUrl } from "../../routes";
import { ICheckoutData, ICheckoutUserArgs, ISubmitArgs } from "../../types";
import { IProceedToShippingArgs, IShippingPageProps } from "./types";

const computeCheckoutData = (
  data: FormAddressType,
  lines?: CartLineInterface[],
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
    streetAddress2: data.streetAddress2
  },
  ...(lines && {
    lines: lines.map(({ quantity, variantId }) => ({
      quantity,
      variantId
    }))
  })
});

class Page extends React.Component<IShippingPageProps> {
  state = {
    errors: [],
    loading: false,
    shippingUnavailable: false,
    showModal: false
  };

  onCheckoutCompleted = (data: any) => {
    // tslint:disable-next-line:no-console
    console.log("data compl", data);
  };

  proceedToShippingOptions = () => {
    const { update, history, token } = this.props.proceedToNextStepData;
    const canProceed =
      !this.state.errors.length && !this.state.shippingUnavailable;

    if (canProceed) {
      update({ checkout: this.props.checkout });
      history.push(generatePath(shippingOptionsUrl, { token }));
    }
  };

  onShippingSubmit = (address: FormAddressType): Promise<any> => {
    const {
      checkoutId,
      createCheckout,
      user: { email },
      lines,
      update,
      updateCheckout
    } = this.props;

    update({
      shippingAsBilling: maybe(() => address.asBilling, false)
    });
    if (!checkoutId) {
      return createCheckout({
        variables: {
          checkoutInput: computeCheckoutData(address, lines)
        }
      });
    }
    return updateCheckout({
      variables: {
        checkoutId,
        ...computeCheckoutData(address, null, email)
      }
    });
  };

  onSubmitHandler = (address: FormAddressType) => {
    this.setState({ loading: true });

    return this.onShippingSubmit(address).then(response => {
      const errors = findFormErrors(response);
      const checkout = maybe(
        () => response.checkoutShippingAddressUpdate.checkout,
        null
      );

      this.setState({
        errors,
        loading: false,
        shippingUnavailable:
          (checkout && !checkout.availableShippingMethods.length) || true
      });
      return { errors };
    });
  };

  renderShippingUnavailableModal = () => (
    <OverlayContext.Consumer>
      {overlay => (
        <>
          {overlay.show(OverlayType.modal, OverlayTheme.modal, {
            content: <ShippingUnavailableModal hide={overlay.hide} />
          })}
          ;
        </>
      )}
    </OverlayContext.Consumer>
  );

  getShippingProps = (
    submitData: ISubmitArgs,
    userCheckoutData: ICheckoutUserArgs
  ) => ({
    buttonText: "Continue to Shipping",
    errors: this.state.errors,
    loading: this.state.loading,
    onSubmit: this.onSubmitHandler,
    proceedToNextStep: this.proceedToShippingOptions,
    ...submitData,
    ...userCheckoutData
  });

  render() {
    const {
      checkoutId,
      checkout,
      createCheckout,
      lines,
      proceedToNextStepData,
      shop,
      user,
      update,
      updateCheckout
    } = this.props;

    const shippingProps = this.getShippingProps(
      {
        checkoutId,
        createCheckout,
        email: maybe(() => user.email, null),
        lines,
        update,
        updateCheckout
      },
      { checkout, user }
    );

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
                type="shipping"
              />
            ) : (
              <GuestAddressForm {...shippingProps} shop={shop} />
            )}
          </Steps>
          {this.state.showModal && this.renderShippingUnavailableModal()}
        </div>
      </CartSummary>
    );
  }
}

export default Page;
