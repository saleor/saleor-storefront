import * as React from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router";

import { Button } from "..";
import { CheckoutContext } from "../CheckoutApp/context";
import { UPDATE_CHECKOUT_SHIPPING_OPTION } from "./queries";

import "./scss/index.scss";

class CheckoutShipping extends React.Component<
  RouteComponentProps<{ id }>,
  { selectedShipping: string }
> {
  constructor(props) {
    super(props);
    this.state = { selectedShipping: "" };
  }
  render() {
    return (
      <div className="checkout-shipping-options">
        <CheckoutContext.Consumer>
          {({ checkout }) => {
            return (
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
                <div className="checkout__step">
                  <span>2</span>
                  <h4 className="checkout__header">Shipping Method</h4>
                </div>
                <Mutation mutation={UPDATE_CHECKOUT_SHIPPING_OPTION}>
                  {(updateCheckoutShippingOptions, { data }) => {
                    if (
                      data &&
                      data.checkoutShippingMethodUpdate.errors.length === 0
                    ) {
                      this.props.history.push(
                        `/checkout/${checkout.token}/billing-address/`
                      );
                    }
                    return (
                      <div className="checkout__content">
                        <div className="checkout-shipping-options__form">
                          {checkout.availableShippingMethods.length > 0 &&
                            checkout.availableShippingMethods.map(method => (
                              <div
                                key={method.id}
                                className={`checkout-shipping-options__form__option${
                                  this.state.selectedShipping === method.id
                                    ? " checkout-shipping-options__form__option--selected"
                                    : ""
                                }`}
                                onClick={() =>
                                  this.setState({
                                    selectedShipping: method.id
                                  })
                                }
                              >
                                <input
                                  type="radio"
                                  name="shippingOprtions"
                                  value={method.id}
                                />
                                <label>
                                  {method.name} | +{method.price.currency}
                                  {method.price.amount}
                                </label>
                              </div>
                            ))}
                        </div>
                        <Button
                          onClick={event => {
                            updateCheckoutShippingOptions({
                              variables: {
                                checkoutId: checkout.id,
                                shippingMethodId: this.state.selectedShipping
                              }
                            });
                            event.preventDefault();
                          }}
                        >
                          Continue to billing
                        </Button>
                      </div>
                    );
                  }}
                </Mutation>
                <div className="checkout__step checkout__step--inactive">
                  <span>3</span>
                  <h4 className="checkout__header">Billing</h4>
                </div>
                <div className="checkout__step checkout__step--inactive">
                  <span>4</span>
                  <h4 className="checkout__header">Payment Method</h4>
                </div>
              </>
            );
          }}
        </CheckoutContext.Consumer>
      </div>
    );
  }
}

export default CheckoutShipping;
