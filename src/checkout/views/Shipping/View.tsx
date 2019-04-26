import * as React from "react";
import { generatePath, RouteComponentProps } from "react-router";

import {
  FormAddressType,
  OverlayContext,
  OverlayTheme,
  OverlayType
} from "../../../components";
import {
  CartContext,
  CartLineInterface
} from "../../../components/CartProvider/context";
import { ShopContext } from "../../../components/ShopProvider/context";
import { UserContext } from "../../../components/User/context";
import { findFormErrors, maybe } from "../../../core/utils";
import {
  CartSummary,
  GuestAddressForm,
  Steps,
  UserAddressSelector
} from "../../components";
import { CheckoutContext, CheckoutStep } from "../../context";
import { TypedCreateCheckoutMutation } from "../../queries";
import { shippingOptionsUrl } from "../../routes";
import { ICheckoutData, ISubmitArgs } from "../../types";
import { TypedUpdateCheckoutShippingAddressMutation } from "./queries";
import ShippingUnavailableModal from "./ShippingUnavailableModal";
import { IProceedToShippingArgs } from "./types";

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

class View extends React.Component<RouteComponentProps<{ token?: string }>> {
  state = {
    checkout: null,
    errors: [],
    loading: false,
    shippingUnavailable: false,
    showModal: false
  };

  proceedToShippingOptions = (proceedData: IProceedToShippingArgs) => () => {
    const { update, history, token } = proceedData;
    const canProceed = !this.state.errors && !this.state.shippingUnavailable;

    if (canProceed) {
      update({ checkout: this.state.checkout });
      history.push(generatePath(shippingOptionsUrl, { token }));
    } else {
      this.setState({ showModal: true });
    }
  };

  onShippingSubmit = ({
    checkoutId,
    createCheckout,
    email,
    lines,
    update,
    updateCheckout
  }: ISubmitArgs) => (address: FormAddressType): Promise<any> => {
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

  onSubmitHandler = (data: ISubmitArgs) => (address: FormAddressType) => {
    this.setState({ loading: true });

    return this.onShippingSubmit(data)(address).then(response => {
      const errors = findFormErrors(response);
      const checkout = maybe(
        () => response.checkoutShippingAddressUpdate.checkout,
        null
      );
      this.setState({
        checkout,
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
    proceedData: IProceedToShippingArgs,
    user,
    checkout
  ) => ({
    buttonText: "Continue to Shipping",
    checkout,
    errors: this.state.errors,
    loading: this.state.loading,
    onSubmit: this.onSubmitHandler(submitData),
    proceedToNextStep: this.proceedToShippingOptions(proceedData),
    user
  });

  render() {
    const {
      history,
      match: {
        params: { token }
      }
    } = this.props;

    return (
      <CheckoutContext.Consumer>
        {({ update, checkout }) => (
          <CartSummary checkout={checkout}>
            <div className="checkout-shipping">
              <Steps
                step={CheckoutStep.ShippingAddress}
                token={token}
                checkout={checkout}
              >
                <ShopContext.Consumer>
                  {shop => (
                    <TypedCreateCheckoutMutation>
                      {createCheckout => (
                        <TypedUpdateCheckoutShippingAddressMutation>
                          {updateCheckout => (
                            <CartContext.Consumer>
                              {({ lines }) => (
                                <UserContext.Consumer>
                                  {({ user }) => {
                                    const shippingProps = this.getShippingProps(
                                      {
                                        checkoutId: maybe(
                                          () => checkout.id,
                                          null
                                        ),
                                        createCheckout,
                                        email: maybe(() => user.email, null),
                                        lines,
                                        update,
                                        updateCheckout
                                      },
                                      { history, token, update },
                                      user,
                                      checkout
                                    );

                                    return user ? (
                                      <UserAddressSelector
                                        {...shippingProps}
                                        update={update}
                                        type="shipping"
                                      />
                                    ) : (
                                      <GuestAddressForm
                                        {...shippingProps}
                                        shop={shop}
                                      />
                                    );
                                  }}
                                </UserContext.Consumer>
                              )}
                            </CartContext.Consumer>
                          )}
                        </TypedUpdateCheckoutShippingAddressMutation>
                      )}
                    </TypedCreateCheckoutMutation>
                  )}
                </ShopContext.Consumer>
              </Steps>
              {this.state.showModal && this.renderShippingUnavailableModal()}
            </div>
          </CartSummary>
        )}
      </CheckoutContext.Consumer>
    );
  }
}

export default View;
