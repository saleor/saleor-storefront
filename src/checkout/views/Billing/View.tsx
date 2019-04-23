import { History } from "history";
import { omit } from "lodash";
import * as React from "react";
import { MutationFn } from "react-apollo";
import { generatePath, RouteComponentProps } from "react-router";

import { FormAddressType } from "../../../components";
import { ShopContext } from "../../../components/ShopProvider/context";
import { UserContext } from "../../../components/User/context";
import { maybe } from "../../../core/utils";
import {
  CartSummary,
  GuestAddressForm,
  StepCheck,
  Steps,
  UserAddressSelector
} from "../../components";
import {
  CheckoutContext,
  CheckoutContextInterface,
  CheckoutStep
} from "../../context";
import { paymentUrl } from "../../routes";
import { CheckoutFormType } from "../../types";
import { Checkout } from "../../types/Checkout";
import { TypedUpdateCheckoutBillingAddressMutation } from "./queries";
import { updateCheckoutBillingAddress } from "./types/updateCheckoutBillingAddress";

const proceedToPayment = (
  data: updateCheckoutBillingAddress,
  update: (checkoutData: CheckoutContextInterface) => void,
  history: History,
  token?: string
) => {
  const canProceed = !data.checkoutBillingAddressUpdate.errors.length;

  if (canProceed) {
    update({ checkout: data.checkoutBillingAddressUpdate.checkout });
    history.push(generatePath(paymentUrl, { token }));
  }
};

const computeMutationVariables = (
  formData: FormAddressType,
  checkout: Checkout,
  sameAsShipping: boolean
) => {
  const { shippingAddress } = checkout;
  const data = sameAsShipping ? shippingAddress : formData;

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

class View extends React.Component<
  RouteComponentProps<{ token?: string }>,
  { sameAsShipping: boolean; validateStep: boolean }
> {
  state = { sameAsShipping: false, validateStep: true };

  componentDidMount() {
    this.setState({ validateStep: false });
  }

  handleSubmit = (
    saveBillingAddress: MutationFn,
    checkout: Checkout,
    sameAsShipping: boolean
  ) => (formData: FormAddressType) =>
    saveBillingAddress(
      computeMutationVariables(formData, checkout, sameAsShipping)
    );

  render() {
    const {
      history,
      match: {
        path,
        params: { token }
      }
    } = this.props;
    const { validateStep, sameAsShipping } = this.state;

    return (
      <CheckoutContext.Consumer>
        {({ checkout, update, step }) =>
          validateStep ? (
            <StepCheck
              step={step}
              checkout={checkout}
              path={path}
              token={token}
            />
          ) : (
            <CartSummary checkout={checkout}>
              <Steps
                step={CheckoutStep.BillingAddress}
                token={token}
                checkout={checkout}
              >
                <TypedUpdateCheckoutBillingAddressMutation
                  onCompleted={data =>
                    proceedToPayment(data, update, history, token)
                  }
                >
                  {(saveBillingAddress, { data, loading }) => (
                    <ShopContext.Consumer>
                      {shop => {
                        const billingProps = {
                          buttonText: "Continue to Payment",
                          checkout,
                          errors: maybe(
                            () => data.checkoutBillingAddressUpdate.errors,
                            []
                          ),
                          loading,
                          onSubmit: this.handleSubmit(
                            saveBillingAddress,
                            checkout,
                            sameAsShipping
                          ),
                          type: "billing" as CheckoutFormType
                        };

                        return (
                          <>
                            <div className="address-form__copy-address">
                              <label className="checkbox">
                                <input
                                  name="asBilling"
                                  type="checkbox"
                                  checked={sameAsShipping}
                                  onChange={({ target: { checked } }) =>
                                    this.setState({
                                      sameAsShipping: checked
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
                                    user={user}
                                    update={update}
                                    {...billingProps}
                                  />
                                ) : (
                                  <GuestAddressForm
                                    key={`${sameAsShipping}`}
                                    shop={shop}
                                    {...billingProps}
                                    checkout={sameAsShipping ? checkout : null}
                                  />
                                )
                              }
                            </UserContext.Consumer>
                          </>
                        );
                      }}
                    </ShopContext.Consumer>
                  )}
                </TypedUpdateCheckoutBillingAddressMutation>
              </Steps>
            </CartSummary>
          )
        }
      </CheckoutContext.Consumer>
    );
  }
}

export default View;
