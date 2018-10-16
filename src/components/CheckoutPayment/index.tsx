import * as braintree from "braintree-web";
import * as React from "react";
import { Query } from "react-apollo";
import NumberFormat from "react-number-format";
import { RouteComponentProps } from "react-router";

import { AddressSummary, Button, Form, Loader, TextField } from "..";
import { PROVIDERS } from "../../core/config";
import { CheckoutContext } from "../CheckoutApp/context";
import { GET_PAYMENT_TOKEN } from "./queries";

import "./scss/index.scss";

class CheckoutPayment extends React.Component<RouteComponentProps<{ id }>, {}> {
  tokenizeCcCard = (paymentClientToken, creditCard) => {
    braintree.client.create(
      {
        authorization: paymentClientToken
      },
      (err, client) => {
        client.request(
          {
            data: { creditCard },
            endpoint: "payment_methods/credit_cards",
            method: "post"
          },
          (err, response) => {
            console.log(err, response);
            // Send response.creditCards[0].nonce to your server
          }
        );
      }
    );
  };

  render() {
    return (
      <Query
        query={GET_PAYMENT_TOKEN}
        variables={{
          gateway: PROVIDERS[PROVIDERS.BRAINTREE]
        }}
      >
        {({ loading, error, data }) => {
          if (loading) {
            return <Loader />;
          }
          if (error) {
            return `Error!: ${error}`;
          }
          const { paymentClientToken } = data;
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
                      <AddressSummary address={checkout.shippingAddress} />
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
                    <div className="checkout__step checkout__step--inactive">
                      <span>3</span>
                      <h4 className="checkout__header">Billing Address</h4>
                    </div>
                    <div className="checkout__content">
                      <AddressSummary address={checkout.billingAddress} />
                    </div>
                    <div className="checkout__step">
                      <span>4</span>
                      <h4 className="checkout__header">Payment Method</h4>
                    </div>
                    <div className="checkout__content">
                      <Form
                        onSubmit={(event, data) => {
                          event.preventDefault();
                          this.tokenizeCcCard(paymentClientToken, {
                            billingAddress: {
                              postalCode: checkout.billingAddress.postalCode
                            },
                            cvv: data.cvc.replace(/\s+/g, ""),
                            expirationDate: data.expiry.replace(/\s+/g, ""),
                            number: data.number.replace(/\s+/g, "")
                          });
                        }}
                      >
                        <TextField
                          type="text"
                          name="name"
                          label="Name on Card"
                        />
                        <span className="input__label">Number</span>
                        <NumberFormat
                          name="number"
                          customInput={TextField}
                          format="#### #### #### ####"
                        />
                        <span className="input__label">CVC</span>
                        <NumberFormat
                          name="cvc"
                          customInput={TextField}
                          format="####"
                        />
                        <span className="input__label">Expiry Date</span>
                        <NumberFormat
                          name="expiry"
                          customInput={TextField}
                          format="## / ##"
                        />
                        <Button>Continue to review your order</Button>
                      </Form>
                    </div>
                  </>
                )}
              </CheckoutContext.Consumer>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default CheckoutPayment;
