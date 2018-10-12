import * as React from "react";
import { Mutation, Query } from "react-apollo";
import { RouteComponentProps } from "react-router";

import { Button, Form, SelectField, TextField } from "..";
import { CheckoutContext } from "../CheckoutApp/context";
import { GET_COUNTRIES_LIST } from "../CheckoutShipping/queries";
import { UPDATE_CHECKOUT_BILLING_ADDRESS } from "./queries";

class CheckoutBilling extends React.Component<
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
          {({ checkout }) => (
            <>
              <div className="checkout__step checkout__step--inactive">
                <span>1</span>
                <h4 className="checkout__header">Shipping Address</h4>
              </div>
              <div className="checkout__content">
                <p>
                  <strong>
                    {checkout.shippingAddress.firstName}
                    {checkout.shippingAddress.lastName}
                  </strong>
                  <br />
                  {checkout.shippingAddress.companyName}
                  <br />
                  {checkout.shippingAddress.streetAddress1}
                  <br />
                  {checkout.shippingAddress.streetAddress2}
                  <br />
                  {checkout.shippingAddress.streetAddress2}
                  <br />
                  {checkout.shippingAddress.city},
                  {checkout.shippingAddress.postalCode}
                  <br />
                  {checkout.shippingAddress.countryArea}
                  <br />
                  {checkout.shippingAddress.companyName}
                  <br />
                  Phone Number: {checkout.shippingAddress.phone}
                </p>
              </div>
              <div className="checkout__step checkout__step--inactive">
                <span>2</span>
                <h4 className="checkout__header">Shipping Method</h4>
              </div>
              <div className="checkout__content">
                <p>
                  {`${checkout.shippingMethod.name} | ${
                    checkout.shippingMethod.price.amount
                  }`}
                </p>
              </div>
              <div className="checkout__step">
                <span>3</span>
                <h4 className="checkout__header">Billing Address</h4>
              </div>
              <Query query={GET_COUNTRIES_LIST}>
                {({ data: { shop } }) => {
                  return (
                    <Mutation mutation={UPDATE_CHECKOUT_BILLING_ADDRESS}>
                      {(saveBillingAddress, { data, loading }) => {
                        if (
                          data &&
                          data.checkoutShippingAddressUpdate.errors.length === 0
                        ) {
                          this.props.history.push(
                            `/checkout/${checkout.token}/shipping-options/`
                          );
                        }
                        return (
                          <div className="checkout__content">
                            <Form
                              errors={data && data.errors}
                              onSubmit={(event, data) => {
                                saveBillingAddress({
                                  variables: {
                                    checkoutId: checkout.id,
                                    shippingAddress: {
                                      city: data.city,
                                      country: data.countryName,
                                      countryArea: data.state,
                                      firstName: data.givenName,
                                      lastName: data.familyName,
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
                              <Button disabled={loading}>
                                {loading ? "Loading" : "Continue to payment"}
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
