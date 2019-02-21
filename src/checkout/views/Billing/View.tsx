import { History } from "history";
import * as React from "react";
import { generatePath, RouteComponentProps } from "react-router";

import { FormAddressType, ShippingAddressForm } from "../../../components";
import { ShopContext } from "../../../components/ShopProvider/context";
import { getShop_shop } from "../../../components/ShopProvider/types/getShop";
import { maybe } from "../../../core/utils";
import { CartSummary, StepCheck, Steps } from "../../components";
import {
  CheckoutContext,
  CheckoutContextInterface,
  CheckoutStep
} from "../../context";
import { paymentUrl } from "../../routes";
import { Checkout, Checkout_billingAddress } from "../../types/Checkout";
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

const extractBillingData = (
  address: Checkout_billingAddress | null,
  shop: getShop_shop
) => {
  const hasAddress = maybe(() => !!address.country);
  if (hasAddress) {
    return address;
  }

  const { geolocalization, defaultCountry } = shop;
  return {
    ...address,
    country: {
      code: geolocalization.country
        ? geolocalization.country.code
        : defaultCountry.code,
      country: geolocalization.country
        ? geolocalization.country.country
        : defaultCountry.country
    }
  };
};

const computeMutationVariables = (
  data: FormAddressType,
  checkout: Checkout
) => ({
  variables: {
    billingAddress: {
      city: data.city,
      country: data.country.value || data.country.code,
      countryArea: data.countryArea,
      firstName: data.firstName,
      lastName: data.lastName,
      postalCode: data.postalCode,
      streetAddress1: data.streetAddress1,
      streetAddress2: data.streetAddress2
    },
    checkoutId: checkout.id
  }
});

class View extends React.Component<
  RouteComponentProps<{ token?: string }>,
  { sameAsShipping: boolean; validateStep: boolean }
> {
  state = { sameAsShipping: false, validateStep: true };

  componentDidMount() {
    this.setState({ validateStep: false });
  }

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
                      {shop => (
                        <>
                          <div className="address-form__copy-address">
                            <label className="checkbox">
                              <input
                                name="asBilling"
                                type="checkbox"
                                checked={sameAsShipping}
                                onChange={({ target: { checked } }) =>
                                  this.setState({ sameAsShipping: checked })
                                }
                              />
                              <span>Same as Shipping Address</span>
                            </label>
                          </div>
                          <ShippingAddressForm
                            key={`${sameAsShipping}`}
                            buttonText="Continue to Payment"
                            billing
                            data={extractBillingData(
                              sameAsShipping ? checkout.shippingAddress : null,
                              shop
                            )}
                            errors={maybe(
                              () => data.checkoutBillingAddressUpdate.errors,
                              []
                            )}
                            loading={loading}
                            onSubmit={(event, formData) => {
                              saveBillingAddress(
                                computeMutationVariables(formData, checkout)
                              );
                              event.preventDefault();
                            }}
                          />
                        </>
                      )}
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
