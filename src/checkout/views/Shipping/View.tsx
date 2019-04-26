import * as React from "react";
import { generatePath, RouteComponentProps } from "react-router";

import { FormAddressType } from "../../../components";
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
  ShippingUnavailableModal,
  Steps,
  UserAddressSelector
} from "../../components";
import { CheckoutContext, CheckoutStep } from "../../context";
import { TypedCreateCheckoutMutation } from "../../queries";
import { shippingOptionsUrl } from "../../routes";
import { ICheckoutData, ISubmitArgs } from "../../types";
import Page from "./Page";
import { TypedUpdateCheckoutShippingAddressMutation } from "./queries";
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

  onCheckoutCompleted = (data: any) => {
    // tslint:disable-next-line:no-console
    console.log("data compl", data);
  };

  proceedToShippingOptions = (proceedData: IProceedToShippingArgs) => () => {
    const { update, history, token } = proceedData;
    const canProceed =
      !this.state.errors.length && !this.state.shippingUnavailable;

    if (canProceed) {
      update({ checkout: this.state.checkout });
      history.push(generatePath(shippingOptionsUrl, { token }));
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

  // getShippingProps = (
  //   submitData: ISubmitArgs,
  //   proceedData: IProceedToShippingArgs,
  //   userCheckoutData: ICheckoutUserArgs
  // ) => ({
  //   buttonText: "Continue to Shipping",
  //   errors: this.state.errors,
  //   loading: this.state.loading,
  //   onSubmit: this.onSubmitHandler(submitData),
  //   proceedToNextStep: this.proceedToShippingOptions(proceedData),
  //   ...userCheckoutData
  // });

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
                        <TypedUpdateCheckoutShippingAddressMutation
                          onCompleted={this.onCheckoutCompleted}
                        >
                          {updateCheckout => (
                            <CartContext.Consumer>
                              {({ lines }) => (
                                <UserContext.Consumer>
                                  {({ user }) => (
                                    <Page
                                      checkoutId={maybe(
                                        () => checkout.id,
                                        null
                                      )}
                                      checkout={checkout}
                                      createCheckout={createCheckout}
                                      shop={shop}
                                      update={update}
                                      updateCheckout={updateCheckout}
                                      user={user}
                                      proceedToNextStepData={{
                                        history,
                                        token,
                                        update
                                      }}
                                      lines={lines}
                                    />
                                  )}
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
            </div>
          </CartSummary>
        )}
      </CheckoutContext.Consumer>
    );
  }
}

export default View;
