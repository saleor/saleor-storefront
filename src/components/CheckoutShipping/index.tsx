import * as React from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router";

import { Button, Form, TextField } from "..";
import { CheckoutContext } from "../CheckoutApp/context";
import { UPDATE_CHECKOUT_SHIPPING_ADDRESS } from "./queries";

import "./scss/index.scss";

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
        <div className="checkout__step">
          <span>1</span> <h4 className="checkout__header">Shipping Address</h4>
        </div>
        <Mutation mutation={UPDATE_CHECKOUT_SHIPPING_ADDRESS}>
          {(saveShippingAddress, { data }) => {
            if (data && data.errors.length === 0) {
              this.props.history.push("/checkout/shipping-options/");
            }
            return (
              <CheckoutContext.Consumer>
                {({ checkout }) => (
                  <div className="checkout__content">
                    <Form
                      errors={data && data.errors}
                      onSubmit={(event, data) => {
                        saveShippingAddress({
                          variables: {
                            checkoutId: checkout.id,
                            shippingAddress: {
                              city: data.city,
                              country: data.country,
                              countryArea: data.state,
                              firstName: data.givenName,
                              lastName: data.familyName,
                              postalCode: data.postal,
                              streetAddress1: data.streetAddress1,
                              streetAddress2: data.streetAddress2
                            }
                          }
                        });
                        event.preventDefault();
                      }}
                    >
                      <TextField
                        label="Email Address"
                        type="email"
                        name="email"
                      />
                      <TextField
                        label="First Name"
                        type="given-name"
                        name="givenName"
                      />
                      <TextField
                        label="Last Name"
                        type="family-name"
                        name="familyName"
                      />
                      <TextField
                        label="Street Line 1"
                        type="address-line1"
                        name="addressLine1"
                      />
                      <TextField
                        label="Street Line 2"
                        type="address-line2"
                        name="addressLine2"
                      />
                      <TextField
                        label="State/Province"
                        type="state"
                        name="state"
                      />
                      <TextField label="City" type="city" name="city" />
                      <TextField
                        label="Zip-Code"
                        type="postal-code"
                        name="postalCode"
                      />
                      <TextField
                        label="Country"
                        type="country-name"
                        name="countryName"
                      />
                      <label>
                        <input type="checkbox" />
                        Use as Billing Address
                      </label>
                      <Button>Continue to shipping</Button>
                    </Form>
                  </div>
                )}
              </CheckoutContext.Consumer>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default CheckoutShipping;
