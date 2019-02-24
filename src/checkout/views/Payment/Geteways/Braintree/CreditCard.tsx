import classNames from "classnames";
import React from "react";
import NumberFormat from "react-number-format";

import { GatewaysEnum } from "../../../../../../types/globalTypes";
import { Form, TextField } from "../../../../../components";
import {
  braintreePayment,
  ErrorData
} from "../../../../../core/payments/braintree";
import { ProviderProps } from "../../View";

class CreditCard extends React.PureComponent<ProviderProps, ErrorData> {
  state = {
    cvv: "",
    expirationMonth: "",
    expirationYear: "",
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

  render() {
    const { formRef, loading } = this.props;
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
        <span className="input__label">Number</span>
        <div className={classNameError(cardNumber)}>
          <NumberFormat
            autoComplete="cc-number"
            customInput={TextField}
            disabled={loading}
            format="#### #### #### ####"
            name="ccNumber"
          />
        </div>
        {fieldError(cardNumber)}

        <div className="checkout-payment__form-grid">
          <div className={classNameError(cvv)}>
            <span className="input__label">CVC</span>
            <NumberFormat
              autoComplete="cc-csc"
              customInput={TextField}
              disabled={loading}
              format="####"
              name="ccCsc"
            />
            {fieldError(cvv)}
          </div>

          <div className={classNameError(expirationMonth || expirationYear)}>
            <span className="input__label">Expiry Date</span>
            <NumberFormat
              autoComplete="cc-exp"
              customInput={TextField}
              disabled={loading}
              format="## / ##"
              name="ccExp"
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
