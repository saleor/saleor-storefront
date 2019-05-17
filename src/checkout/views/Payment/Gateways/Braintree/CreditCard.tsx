import "./scss/index.scss";

import React from "react";

import { GatewaysEnum } from "../../../../../../types/globalTypes";
import { TextField } from "../../../../../components";

import {
  braintreePayment,
  ICreditCardState,
  IPaymentCardError,
  PaymentData
} from "../../../../../core/payments/braintree";
import { maybe } from "../../../../../core/utils";
import { CreditCardForm } from "../../../../components";
import { ProviderProps } from "../../View";

const INITIAL_CARD_STATE = {
  cardErrors: {
    cvv: "",
    expirationMonth: "",
    expirationYear: "",
    number: ""
  },
  nonFieldError: ""
};
class CreditCard extends React.PureComponent<ProviderProps, ICreditCardState> {
  state = {
    ...INITIAL_CARD_STATE,
    cardValues: {
      ccCsc: null,
      ccExp: null,
      ccNumber: null
    },
    focusedInput: null
  };

  tokenizeCcCard = async creditCard => {
    const {
      checkout: { update },
      setLoadingState,
      paymentClientToken
    } = this.props;

    this.setState(INITIAL_CARD_STATE);

    try {
      const cardData = (await braintreePayment(
        paymentClientToken,
        creditCard
      )) as PaymentData;
      await update({ cardData });
      return cardData.token;
    } catch (errors) {
      this.setCardErrors(errors, setLoadingState);
      return null;
    }
  };

  setCardErrors = (
    errors: IPaymentCardError[],
    setLoadingState: (loading: boolean) => void
  ) => {
    errors.map(({ field, message }: IPaymentCardError) => {
      this.setState(
        prevState => {
          const { cardErrors } = prevState;

          return {
            ...prevState,
            cardErrors: {
              ...cardErrors,
              [field]: maybe(() => cardErrors[field] + ". " + message, message)
            }
          };
        },
        () => setLoadingState(false)
      );
    });
  };

  removeEmptySpaces = (text: string) => text.replace(/\s+/g, "");

  handleSubmit = async (evt: React.FormEvent, formData) => {
    const {
      setLoadingState,
      checkout: {
        checkout: {
          billingAddress: { postalCode }
        }
      },
      processPayment
    } = this.props;

    evt.preventDefault();
    setLoadingState(true);
    const creditCard = {
      billingAddress: {
        postalCode
      },
      cvv: this.removeEmptySpaces(maybe(() => formData.ccCsc, "")),
      expirationDate: this.removeEmptySpaces(maybe(() => formData.ccExp, "")),
      number: this.removeEmptySpaces(maybe(() => formData.ccNumber, ""))
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
    const cardValues = { ...this.state.cardValues };
    cardValues[name] = value;
    this.setState({ cardValues });
  };

  getInputProps = () => ({
    customInput: TextField,
    disabled: this.props.loading,
    onBlur: this.handleOnBlur,
    onChange: this.handleOnChange,
    onFocus: this.handleOnFocus
  });

  render() {
    const { focusedInput, cardErrors, cardValues } = this.state;

    return (
      <CreditCardForm
        formRef={this.props.formRef}
        cardErrors={cardErrors}
        cardValues={cardValues}
        focusedInputName={focusedInput}
        inputProps={this.getInputProps()}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default CreditCard;
