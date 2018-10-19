import * as React from "react";
import { Query } from "react-apollo";
import NumberFormat from "react-number-format";
import { RouteComponentProps } from "react-router";

import { AddressSummary, Button, Form, TextField } from "..";
import { PROVIDERS } from "../../core/config";
import { barintreePayment } from "../../core/payments/braintree";
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

  tokenizeCcCard = async (
    paymentClientToken,
    creditCard,
    updateCheckout,
    token
  ) => {
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
    try {
      const cardData = await barintreePayment(paymentClientToken, creditCard);
      this.setState({
        loading: false
      });
      updateCheckout({ cardData });
      this.props.history.push(`/checkout/${token}/review/`);
    } catch (errors) {
      errors.map(error => {
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
                                cvv: formData.ccCsc
                                  ? formData.ccCsc.replace(/\s+/g, "")
                                  : "",
                                expirationDate: formData.ccExp
                                  ? formData.ccExp.replace(/\s+/g, "")
                                  : "",
                                number: formData.ccNumber
                                  ? formData.ccNumber.replace(/\s+/g, "")
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
                              name="ccNumber"
                              autoComplete="cc-number"
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
                                name="ccCsc"
                                autoComplete="cc-csc"
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
                                name="ccExp"
                                autoComplete="cc-exp"
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
