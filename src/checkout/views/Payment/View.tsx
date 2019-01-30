import "./scss/index.scss";

import * as React from "react";
import { MutationFn } from "react-apollo";
import NumberFormat from "react-number-format";
import { generatePath, RouteComponentProps } from "react-router";

import { GatewaysEnum } from "../../../../types/globalTypes";
import { Button, Form, TextField } from "../../../components";
import { braintreePayment, ErrorData } from "../../../core/payments/braintree";
import { StepCheck, Steps } from "../../components";
import {
  CheckoutContext,
  CheckoutContextInterface,
  CheckoutStep
} from "../../context";
import { reviewUrl } from "../../routes";
import {
  TypedGetPaymentTokenQuery,
  TypedPaymentMethodCreateMutation
} from "./queries";
import { createPayment, createPaymentVariables } from "./types/createPayment";

class View extends React.Component<
  RouteComponentProps<{ token?: string }>,
  {
    errors: ErrorData;
    loading: boolean;
  }
> {
  gateway: GatewaysEnum = GatewaysEnum.BRAINTREE;
  state = {
    errors: {
      cvv: "",
      expirationMonth: "",
      expirationYear: "",
      nonFieldError: "",
      number: ""
    },
    loading: false
  };

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

  processPayment = async (
    createPaymentMethod: MutationFn<createPayment, createPaymentVariables>,
    paymentClientToken: string,
    formData: { [key: string]: string },
    checkout: CheckoutContextInterface
  ) => {
    const {
      checkout: { billingAddress, totalPrice, id },
      update
    } = checkout;

    const token = await this.tokenizeCcCard(
      paymentClientToken,
      {
        billingAddress: {
          postalCode: billingAddress.postalCode
        },
        cvv: formData.ccCsc ? formData.ccCsc.replace(/\s+/g, "") : "",
        expirationDate: formData.ccExp
          ? formData.ccExp.replace(/\s+/g, "")
          : "",
        number: formData.ccNumber ? formData.ccNumber.replace(/\s+/g, "") : ""
      },
      update
    );

    if (token) {
      createPaymentMethod({
        variables: {
          input: {
            amount: totalPrice.net.amount,
            billingAddress: {
              city: billingAddress.city,
              country: billingAddress.country.code,
              countryArea: billingAddress.countryArea,
              firstName: billingAddress.firstName,
              lastName: billingAddress.lastName,
              postalCode: billingAddress.postalCode,
              streetAddress1: billingAddress.streetAddress1,
              streetAddress2: billingAddress.streetAddress2
            },
            checkoutId: id,
            gateway: this.gateway,
            token
          }
        }
      });
    }
  };

  proceedNext = (data: createPayment) => {
    const canProceed = !data.checkoutPaymentCreate.errors.length;

    if (canProceed) {
      const {
        history,
        match: {
          params: { token }
        }
      } = this.props;
      this.setState({ loading: false });
      history.push(generatePath(reviewUrl, { token }));
    }
  };

  render() {
    const {
      params: { token },
      path
    } = this.props.match;

    return (
      <CheckoutContext.Consumer>
        {checkout => (
          <>
            <StepCheck
              checkout={checkout.checkout}
              step={checkout.step}
              path={path}
              token={token}
            />
            <TypedGetPaymentTokenQuery variables={{ gateway: this.gateway }}>
              {({ data }) => {
                if (data) {
                  const { paymentClientToken } = data;
                  return (
                    <div className="checkout-payment">
                      <Steps
                        step={CheckoutStep.Payment}
                        token={token}
                        checkout={checkout.checkout}
                      >
                        <TypedPaymentMethodCreateMutation
                          onCompleted={this.proceedNext}
                        >
                          {createPaymentMethod => (
                            <Form
                              onSubmit={(event, formData) => {
                                event.preventDefault();
                                this.processPayment(
                                  createPaymentMethod,
                                  paymentClientToken,
                                  formData,
                                  checkout
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
                                    this.state.errors.cvv
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
                                              this.state.errors.expirationMonth
                                            }. `
                                          : ""
                                      }${this.state.errors.expirationYear}`}
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              <Button
                                type="submit"
                                disabled={this.state.loading}
                              >
                                {this.state.loading
                                  ? "Loading"
                                  : "Continue to review your order"}
                              </Button>
                            </Form>
                          )}
                        </TypedPaymentMethodCreateMutation>
                      </Steps>
                    </div>
                  );
                }
                return null;
              }}
            </TypedGetPaymentTokenQuery>
          </>
        )}
      </CheckoutContext.Consumer>
    );
  }
}

export default View;
