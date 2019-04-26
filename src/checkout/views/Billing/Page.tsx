import * as React from "react";
import { generatePath } from "react-router";

import { FormAddressType } from "../../../components";
import { UserContext } from "../../../components/User/context";
import { findFormErrors, maybe } from "../../../core/utils";
import {
  CartSummary,
  GuestAddressForm,
  StepCheck,
  Steps,
  UserAddressSelector
} from "../../components";
import { CheckoutStep } from "../../context";
import { paymentUrl } from "../../routes";
import { CheckoutFormType } from "../../types";
import { Checkout } from "../../types/Checkout";
import { IBillingPageProps } from "./types";

const computeMutationVariables = (
  formData: FormAddressType,
  checkout: Checkout,
  shippingAsBilling: boolean
) => {
  const { shippingAddress } = checkout;
  const data = shippingAsBilling ? shippingAddress : formData;

  return {
    variables: {
      billingAddress: {
        city: data.city,
        country: data.country.code,
        countryArea: data.countryArea,
        firstName: data.firstName,
        lastName: data.lastName,
        postalCode: data.postalCode,
        streetAddress1: data.streetAddress1,
        streetAddress2: data.streetAddress2
      },
      checkoutId: checkout.id
    }
  };
};

class View extends React.Component<IBillingPageProps> {
  state = {
    errors: [],
    loading: false
  };

  handleSubmit = async (formData: FormAddressType) => {
    this.setState({ loading: true });
    const { saveBillingAddress, checkout, shippingAsBilling } = this.props;

    await saveBillingAddress(
      computeMutationVariables(formData, checkout, shippingAsBilling)
    ).then(response => {
      const errors = findFormErrors(response as any);

      this.setState({
        errors,
        loading: false
      });
    });
    return;
  };

  proceedToPayment = () => {
    const {
      proceedToNextStepData: { history, token, update }
    } = this.props;
    const canProceed = !this.state.errors.length;

    if (canProceed) {
      update({
        checkout: this.props.checkout
      });
      history.push(generatePath(paymentUrl, { token }));
    }
  };

  render() {
    const {
      checkout,
      validateStep,
      proceedToNextStepData: { token },
      path,
      shippingAsBilling,
      shop,
      step,
      update
    } = this.props;

    const billingProps = {
      buttonText: "Proceed to Payment",
      checkout,
      errors: this.state.errors,
      loading: false,
      onSubmit: this.handleSubmit,
      proceedToNextStep: this.proceedToPayment,
      type: "billing" as CheckoutFormType
    };

    return validateStep ? (
      <StepCheck step={step} checkout={checkout} path={path} token={token} />
    ) : (
      <CartSummary checkout={checkout}>
        <Steps
          step={CheckoutStep.BillingAddress}
          token={token}
          checkout={checkout}
        >
          <>
            <div className="address-form__copy-address">
              <label className="checkbox">
                <input
                  name="asBilling"
                  type="checkbox"
                  checked={shippingAsBilling}
                  onChange={({ target: { checked } }) =>
                    update({
                      shippingAsBilling: checked
                    })
                  }
                />
                <span>Same as Shipping Address</span>
              </label>
            </div>

            <UserContext.Consumer>
              {({ user }) =>
                user ? (
                  <UserAddressSelector
                    update={update}
                    user={user}
                    shippingAsBilling={shippingAsBilling}
                    {...billingProps}
                  />
                ) : (
                  <GuestAddressForm
                    key={`${shippingAsBilling}`}
                    shop={shop}
                    {...billingProps}
                    checkout={shippingAsBilling ? checkout : null}
                  />
                )
              }
            </UserContext.Consumer>
          </>
        </Steps>
      </CartSummary>
    );
  }
}

export default View;
