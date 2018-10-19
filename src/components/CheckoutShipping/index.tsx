import * as React from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router";

import { ShippingAddressForm } from "..";
import { CheckoutContext } from "../CheckoutApp/context";
import { UPDATE_CHECKOUT_SHIPPING_ADDRESS } from "./queries";

class CheckoutShipping extends React.Component<
  RouteComponentProps<{ id }>,
  { resetPassword: boolean }
> {
  constructor(props) {
    super(props);
    this.state = { resetPassword: false };
  }

  render() {
    return (
      <div className="checkout-shipping">
        <CheckoutContext.Consumer>
          {({ checkout, updateCheckout }) => (
            <>
              <div className="checkout__step">
                <span>1</span>
                <h4 className="checkout__header">Shipping Address</h4>
              </div>

              <Mutation mutation={UPDATE_CHECKOUT_SHIPPING_ADDRESS}>
                {(saveShippingAddress, { data, loading }) => {
                  if (
                    data &&
                    data.checkoutShippingAddressUpdate.errors.length === 0
                  ) {
                    updateCheckout({
                      checkout: data.checkoutShippingAddressUpdate.checkout
                    });
                    this.props.history.push(
                      `/checkout/${checkout.token}/shipping-options/`
                    );
                  }
                  return (
                    <div className="checkout__content">
                      <ShippingAddressForm
                        errors={data && data.errors}
                        loading={loading}
                        onSubmit={(event, data) => {
                          saveShippingAddress({
                            variables: {
                              checkoutId: checkout.id,
                              shippingAddress: {
                                city: data.city,
                                companyName: data.organization,
                                country: data.countryName,
                                countryArea: data.state,
                                firstName: data.givenName,
                                lastName: data.familyName,
                                phone: data.phoneNumber,
                                postalCode: data.postalCode,
                                streetAddress1: data.addressLine1,
                                streetAddress2: data.addressLine2
                              }
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
                <span>2</span>
                <h4 className="checkout__header">Shipping Method</h4>
              </div>
              <div className="checkout__step">
                <span>3</span>
                <h4 className="checkout__header">Billing</h4>
              </div>
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

export default CheckoutShipping;
