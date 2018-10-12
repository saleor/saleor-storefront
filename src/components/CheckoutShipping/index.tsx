import * as React from "react";
import { Mutation, Query } from "react-apollo";
import { RouteComponentProps } from "react-router";

import { Button, Form, SelectField, TextField } from "..";
import { CheckoutContext } from "../CheckoutApp/context";
import {
  GET_COUNTRIES_LIST,
  UPDATE_CHECKOUT_SHIPPING_ADDRESS
} from "./queries";

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
        <CheckoutContext.Consumer>
          {({ checkout, updateCheckout }) => (
            <>
              <div className="checkout__step">
                <span>1</span>
                <h4 className="checkout__header">Shipping Address</h4>
              </div>
              <Query query={GET_COUNTRIES_LIST}>
                {({ data: { shop } }) => {
                  return (
                    <Mutation mutation={UPDATE_CHECKOUT_SHIPPING_ADDRESS}>
                      {(saveShippingAddress, { data, loading }) => {
                        if (
                          data &&
                          data.checkoutShippingAddressUpdate.errors.length === 0
                        ) {
                          updateCheckout(
                            data.checkoutShippingAddressUpdate.checkout
                          );
                          this.props.history.push(
                            `/checkout/${checkout.token}/shipping-options/`
                          );
                        }
                        return (
                          <div className="checkout__content">
                            <Form
                              errors={data && data.errors}
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
                                label="Company"
                                type="organization"
                                name="organization"
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
                              <SelectField
                                label="Country"
                                name="countryName"
                                options={shop.countries.map(country => ({
                                  label: country.country,
                                  value: country.code
                                }))}
                              />
                              <TextField
                                label="Phone number"
                                type="tel"
                                name="phoneNumber"
                              />
                              <label className="checkbox">
                                <input type="checkbox" />
                                <span>Use as Billing Address</span>
                              </label>
                              <Button disabled={loading}>
                                {loading ? "Loading" : "Continue to shipping"}
                              </Button>
                            </Form>
                          </div>
                        );
                      }}
                    </Mutation>
                  );
                }}
              </Query>
              <div className="checkout__step checkout__step--inactive">
                <span>2</span>
                <h4 className="checkout__header">Shipping Method</h4>
              </div>
              <div className="checkout__step checkout__step--inactive">
                <span>3</span>
                <h4 className="checkout__header">Billing</h4>
              </div>
              <div className="checkout__step checkout__step--inactive">
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
