import "./scss/index.scss";

import classNames from "classnames";
import React from "react";
import NumberFormat from "react-number-format";

import { GatewaysEnum } from "../../../../../../types/globalTypes";
import { Form, TextField } from "../../../../../components";
import {
  braintreePayment,
  ICreditCardState
} from "../../../../../core/payments/braintree";
import { ProviderProps } from "../../View";

const FOCUS_CLASS = "input__label--focus";
class CreditCard extends React.PureComponent<ProviderProps, ICreditCardState> {
  state = {
    cvv: "",
    expirationMonth: "",
    expirationYear: "",
    focusedInput: null,
    inputs: {
      ccCsc: null,
      ccExp: null,
      ccNumber: null
    },

    nonFieldError: "",
    number: ""
  };

  tokenizeCcCard = async creditCard => {
    const {
      checkout: { update },
      setLoadingState,
      paymentClientToken
    } = this.props;
    let cardData;

    this.setState({
      cvv: "",
      expirationMonth: "",
      expirationYear: "",
      nonFieldError: "",
      number: ""
    });

    try {
      cardData = await braintreePayment(paymentClientToken, creditCard);
      await update({ cardData });
      return cardData.token;
    } catch (errors) {
      errors.map(error => {
        this.setState(
          prevState => ({
            ...prevState,
            [error.field]: prevState[error.field]
              ? prevState[error.field] + ". " + error.message
              : error.message
          }),
          () => setLoadingState(false)
        );
      });
      return null;
    }
  };

  handleSubmit = async (evt, formData) => {
    const {
      setLoadingState,
      checkout: {
        checkout: { billingAddress }
      },
      processPayment
    } = this.props;

    evt.preventDefault();
    setLoadingState(true);
    const creditCard = {
      billingAddress: {
        postalCode: billingAddress.postalCode
      },
      cvv: formData.ccCsc ? formData.ccCsc.replace(/\s+/g, "") : "",
      expirationDate: formData.ccExp ? formData.ccExp.replace(/\s+/g, "") : "",
      number: formData.ccNumber ? formData.ccNumber.replace(/\s+/g, "") : ""
    };
    const token = await this.tokenizeCcCard(creditCard);
    processPayment(token, GatewaysEnum.BRAINTREE);
  };

  handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) =>
    this.setState({
      focusedInput: e.target.name
    });

  handleOnBlur = () => this.setState({ focusedInput: null });

  handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const inputs = { ...this.state.inputs };
    inputs[name] = value;
    this.setState({ inputs });
  };

  classNameActive = (name: string) =>
    (this.state.focusedInput === name || this.state.inputs[name]) &&
    FOCUS_CLASS;

  getInputProps = () => ({
    customInput: TextField,
    disabled: this.props.loading,
    onBlur: this.handleOnBlur,
    onChange: this.handleOnChange,
    onFocus: this.handleOnFocus
  });

  render() {
    const { formRef } = this.props;
    const {
      expirationMonth,
      expirationYear,
      cvv,
      number: cardNumber
    } = this.state;
    const fieldError = (error: string) =>
      error ? (
        <span className="input__error checkout-payment__error">{error}</span>
      ) : null;
    const classNameError = (error: string) =>
      classNames({ "checkout-payment__field-error": !!error });

    return (
      <Form formRef={formRef} onSubmit={this.handleSubmit}>
        <div
          className={classNames("input__payment", classNameError(cardNumber))}
        >
          <span
            className={classNames(
              "input__label",
              this.classNameActive("ccNumber")
            )}
          >
            Number
          </span>
          <NumberFormat
            autoComplete="cc-number"
            format="#### #### #### ####"
            name="ccNumber"
            {...this.getInputProps()}
          />
        </div>
        {fieldError(cardNumber)}

        <div className="checkout-payment__form-grid">
          <div className={classNames("input__payment", classNameError(cvv))}>
            <span
              className={classNames(
                "input__label",
                this.classNameActive("ccCsc")
              )}
            >
              CVC
            </span>
            <NumberFormat
              autoComplete="cc-csc"
              format="####"
              name="ccCsc"
              {...this.getInputProps()}
            />
            {fieldError(cvv)}
          </div>

          <div
            className={classNames(
              "input__payment",
              classNameError(expirationMonth || expirationYear)
            )}
          >
            <span
              className={classNames(
                "input__label",
                this.classNameActive("ccExp")
              )}
            >
              Expiry Date
            </span>
            <NumberFormat
              autoComplete="cc-exp"
              format="## / ##"
              name="ccExp"
              {...this.getInputProps()}
            />
            {fieldError(expirationMonth)}
            {fieldError(expirationYear)}
          </div>
        </div>
      </Form>
    );
  }
}

export default CreditCard;
