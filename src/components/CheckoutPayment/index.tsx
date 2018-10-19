import * as braintree from "braintree-web";
import * as React from "react";
import { Query } from "react-apollo";
import NumberFormat from "react-number-format";
import { RouteComponentProps } from "react-router";

import { AddressSummary, Button, Form, TextField } from "..";
import { PROVIDERS } from "../../core/config";
import { CheckoutContext } from "../CheckoutApp/context";
import { GET_PAYMENT_TOKEN } from "./queries";

import "./scss/index.scss";

class CheckoutPayment extends React.Component<
  RouteComponentProps<{ id }>,
  { errors: { [x: string]: string }; loading: boolean }
> {
  constructor(props) {
    super(props);
    this.state = {
      errors: {
        cvv: "",
        expirationMonth: "",
        expirationYear: "",
        nonFieldError: "",
        number: ""
      },
      loading: false
    };
  }

  tokenizeCcCard = (paymentClientToken, creditCard, updateCheckout, token) => {
    this.setState({
      errors: {
        cvv: "",
        expirationMonth: "",
        expirationYear: "",
        nonFieldError: "",
        number: ""
      },
      loading: true
    });
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
          (error, response) => {
            if (error) {
              if (error.details.originalError.fieldErrors.length > 0) {
                error.details.originalError.fieldErrors.map(error => {
                  if (error.field === "creditCard") {
                    error.fieldErrors.map(error => {
                      this.setState(state => {
                        const errors = {
                          ...state.errors,
                          [error.field]: state.errors[error.field]
                            ? state.errors[error.field] + ". " + error.message
                            : error.message
                        };
                        return {
                          errors,
                          loading: false
                        };
                      });
                    });
                  }
                });
              }
            } else {
              const lastDigits = response.creditCards[0].details.lastFour;
              const ccType = response.creditCards[0].details.cardType;
              const token = response.creditCards[0].nonce;
              this.setState({
                loading: false
              });
              updateCheckout({ cardData: { lastDigits, ccType, token } });
              this.props.history.push(`/checkout/${token}/review/`);
            }
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
        {({ data }) => {
          if (data) {
            const { paymentClientToken } = data;
            return (
              <div className="checkout-payment">
                <CheckoutContext.Consumer>
                  {({ checkout, updateCheckout }) => (
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
                          {`${checkout.shippingMethod.name} | +${
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
                          onSubmit={(event, formData) => {
                            event.preventDefault();
                            this.tokenizeCcCard(
                              paymentClientToken,
                              {
                                billingAddress: {
                                  postalCode: checkout.billingAddress.postalCode
                                },
                                cvv: formData["cc-csc"]
                                  ? formData["cc-csc"].replace(/\s+/g, "")
                                  : "",
                                expirationDate: formData["cc-exp"]
                                  ? formData["cc-exp"].replace(/\s+/g, "")
                                  : "",
                                number: formData["cc-number"]
                                  ? formData["cc-number"].replace(/\s+/g, "")
                                  : ""
                              },
                              updateCheckout,
                              checkout.token
                            );
                          }}
                        >
                          <span className="input__label">Number</span>
                          <div
                            className={
                              this.state.errors.number
                                ? "checkout-payment__field-error"
                                : ""
                            }
                          >
                            <NumberFormat
                              name="cc-number"
                              customInput={TextField}
                              format="#### #### #### ####"
                            />
                          </div>
                          {this.state.errors.number ? (
                            <span className="input__error checkout-payment__error">
                              {this.state.errors.number}
                            </span>
                          ) : (
                            ""
                          )}
                          <div className="checkout-payment__form-grid">
                            <div
                              className={
                                this.state.errors.cvc
                                  ? "checkout-payment__field-error"
                                  : ""
                              }
                            >
                              <span className="input__label">CVC</span>
                              <NumberFormat
                                name="cc-csc"
                                customInput={TextField}
                                format="####"
                              />
                              {this.state.errors.cvv ? (
                                <span className="input__error checkout-payment__error">
                                  {this.state.errors.cvv}
                                </span>
                              ) : (
                                ""
                              )}
                            </div>
                            <div
                              className={
                                this.state.errors.expirationMonth ||
                                this.state.errors.expirationYear
                                  ? "checkout-payment__field-error"
                                  : ""
                              }
                            >
                              <span className="input__label">Expiry Date</span>
                              <NumberFormat
                                name="cc-exp"
                                customInput={TextField}
                                format="## / ##"
                              />
                              {this.state.errors.expirationMonth ||
                              this.state.errors.expirationYear ? (
                                <span className="input__error checkout-payment__error">
                                  {`${
                                    this.state.errors.expirationMonth
                                      ? `${this.state.errors.expirationMonth}. `
                                      : ""
                                  }${this.state.errors.expirationYear}`}
                                </span>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <Button disabled={this.state.loading}>
                            {this.state.loading
                              ? "Loading"
                              : "Continue to review your order"}
                          </Button>
                        </Form>
                      </div>
                    </>
                  )}
                </CheckoutContext.Consumer>
              </div>
            );
          }
        }}
      </Query>
    );
  }
}

export default CheckoutPayment;
