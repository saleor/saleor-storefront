import * as React from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

import { AddressSummary, ShippingAddressForm } from "..";
import { CheckoutContext } from "../CheckoutApp/context";
import {
  checkoutBaseUrl,
  checkoutPaymentUrl,
  checkoutShippingOptionsUrl
} from "../CheckoutApp/routes";
import { UPDATE_CHECKOUT_BILLING_ADDRESS } from "./queries";

class CheckoutBilling extends React.Component<RouteComponentProps<{ id }>, {}> {
  render() {
    return (
      <div>
        <CheckoutContext.Consumer>
          {({ checkout, updateCheckout }) => (
            <>
              <Link to={checkoutBaseUrl}>
                <div className="checkout__step checkout__step--inactive">
                  <span>1</span>
                  <h4 className="checkout__header">Shipping Address</h4>
                </div>
              </Link>
              <div className="checkout__content">
                <AddressSummary address={checkout.shippingAddress} />
              </div>
              <Link to={checkoutShippingOptionsUrl}>
                <div className="checkout__step checkout__step--inactive">
                  <span>2</span>
                  <h4 className="checkout__header">Shipping Method</h4>
                </div>
              </Link>
              <div className="checkout__content">
                <p>
                  {`${checkout.shippingMethod.name} | +${
                    checkout.shippingMethod.price.amount
                  }`}
                </p>
              </div>
              <div className="checkout__step">
                <span>3</span>
                <h4 className="checkout__header">Billing Address</h4>
              </div>
              <Mutation mutation={UPDATE_CHECKOUT_BILLING_ADDRESS}>
                {(saveBillingAddress, { data, loading }) => {
                  if (
                    data &&
                    data.checkoutBillingAddressUpdate.errors.length === 0
                  ) {
                    updateCheckout({
                      checkout: data.checkoutBillingAddressUpdate.checkout
                    });
                    this.props.history.push(checkoutPaymentUrl);
                  }
                  return (
                    <div className="checkout__content">
                      <ShippingAddressForm
                        buttonText="Continue to Payment"
                        errors={
                          data && data.checkoutBillingAddressUpdate.errors
                        }
                        loading={loading}
                        onSubmit={(event, data) => {
                          saveBillingAddress({
                            variables: {
                              billingAddress: {
                                city: data.city,
                                country: data.country,
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
                          event.preventDefault();
                        }}
                      />
                    </div>
                  );
                }}
              </Mutation>
              <div className="checkout__step">
                <span>4</span>
                <h4 className="checkout__header">Payment Method</h4>
              </div>
            </>
          )}
        </CheckoutContext.Consumer>
      </div>
    );
  }
}

export default CheckoutBilling;
