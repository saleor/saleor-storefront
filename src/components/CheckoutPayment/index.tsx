import * as React from "react";
import { Mutation, Query } from "react-apollo";
import NumberFormat from "react-number-format";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

import { Button, Form, TextField } from "..";
import { PROVIDERS } from "../../core/config";
import { braintreePayment } from "../../core/payments/braintree";
import { CheckoutContext } from "../CheckoutApp/context";
import {
  checkoutBaseUrl,
  checkoutBillingUrl,
  checkoutReviewUrl,
  checkoutShippingOptionsUrl
} from "../CheckoutApp/routes";
import { GET_PAYMENT_TOKEN, PAYMENT_METHOD_CREATE } from "./queries";

import "./scss/index.scss";
import { AddressSummary } from "../../checkout/components";

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

  tokenizeCcCard = async (paymentClientToken, creditCard, updateCheckout) => {
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
    let cardData;
    try {
      cardData = await braintreePayment(paymentClientToken, creditCard);
      updateCheckout({ cardData });
      return cardData.token;
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
      return null;
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
                  {({
                    checkout: {
                      billingAddress,
                      id,
                      email,
                      shippingAddress,
                      shippingMethod,
                      token,
                      totalPrice
                    },
                    updateCheckout
                  }) => (
                    <>
                      <Link to={checkoutBaseUrl(token)}>
                        <div className="checkout__step checkout__step--inactive">
                          <span>1</span>
                          <h4 className="checkout__header">Shipping Address</h4>
                        </div>
                      </Link>
                      <div className="checkout__content">
                        <AddressSummary
                          address={shippingAddress}
                          email={email}
                        />
                      </div>
                      <Link to={checkoutShippingOptionsUrl(token)}>
                        <div className="checkout__step checkout__step--inactive">
                          <span>2</span>
                          <h4 className="checkout__header">Shipping Method</h4>
                        </div>
                      </Link>
                      <div className="checkout__content">
                        <p>
                          {`${shippingMethod.name} | +${
                            shippingMethod.price.localized
                          }`}
                        </p>
                      </div>
                      <Link to={checkoutBillingUrl(token)}>
                        <div className="checkout__step checkout__step--inactive">
                          <span>3</span>
                          <h4 className="checkout__header">Billing Address</h4>
                        </div>
                      </Link>
                      <div className="checkout__content">
                        <AddressSummary address={billingAddress} />
                      </div>
                      <div className="checkout__step">
                        <span>4</span>
                        <h4 className="checkout__header">Payment Method</h4>
                      </div>
                      <div className="checkout__content">
                        <Mutation mutation={PAYMENT_METHOD_CREATE}>
                          {(createPaymentMethod, { data }) => {
                            if (
                              data &&
                              data.checkoutPaymentCreate.errors.length === 0
                            ) {
                              this.setState({
                                loading: false
                              });
                              this.props.history.push(checkoutReviewUrl(token));
                            }
                            return (
                              <Form
                                onSubmit={async (event, formData) => {
                                  event.preventDefault();
                                  const token = await this.tokenizeCcCard(
                                    paymentClientToken,
                                    {
                                      billingAddress: {
                                        postalCode: billingAddress.postalCode
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
                                    updateCheckout
                                  );
                                  if (token) {
                                    createPaymentMethod({
                                      variables: {
                                        input: {
                                          amount: totalPrice.net.amount,
                                          billingAddress: {
                                            city: billingAddress.city,
                                            country:
                                              billingAddress.country.code,
                                            countryArea:
                                              billingAddress.countryArea,
                                            firstName: billingAddress.firstName,
                                            lastName: billingAddress.lastName,
                                            postalCode:
                                              billingAddress.postalCode,
                                            streetAddress1:
                                              billingAddress.streetAddress1,
                                            streetAddress2:
                                              billingAddress.streetAddress2
                                          },
                                          checkoutId: id,
                                          gateway:
                                            PROVIDERS[PROVIDERS.BRAINTREE],
                                          token
                                        }
                                      }
                                    });
                                  }
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
                                    <span className="input__label">
                                      Expiry Date
                                    </span>
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
                                            ? `${
                                                this.state.errors
                                                  .expirationMonth
                                              }. `
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
                            );
                          }}
                        </Mutation>
                      </div>
                    </>
                  )}
                </CheckoutContext.Consumer>
              </div>
            );
          } else {
            return null;
          }
        }}
      </Query>
    );
  }
}

export default CheckoutPayment;
