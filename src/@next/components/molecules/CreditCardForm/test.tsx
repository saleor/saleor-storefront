import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { CreditCardFormContent as CreditCardForm } from "./CreditCardFormContent";
import * as S from "./styles";
import { IFormikProps, IProps } from "./types";

describe("<CreditCardForm />", () => {
  const CARD_VALUES = {
    ccCsc: "",
    ccExp: "",
    ccNumber: "",
  };

  const CARD_TEXT = {
    ccCsc: "CVC",
    ccExp: "Expiry Date",
    ccNumber: "Number",
  };

  const INPUT_PROPS = {
    customInput: () => <div />,
    disabled: false,
    onBlur: jest.fn(),
    onChange: jest.fn(),
    onFocus: jest.fn(),
  };

  const DEFAULT_PROPS = {
    cardErrors: {},
    cardText: CARD_TEXT,
    focusedInputName: null,
    // formRef: null,
    handleChange: jest.fn(),
    handleSubmit: jest.fn(),
    inputProps: INPUT_PROPS,
    values: CARD_VALUES,
  };

  const renderCreditCardForm = (props: IProps & IFormikProps) =>
    shallow(<CreditCardForm {...props} />);

  it("exists", () => {
    const creditCardForm = renderCreditCardForm(DEFAULT_PROPS);

    expect(creditCardForm.exists()).toEqual(true);
  });

  it("should render <form /> with `onSubmit` prop", () => {
    const form = renderCreditCardForm(DEFAULT_PROPS).find("form");

    expect(form.exists()).toEqual(true);
    expect(form.prop("onSubmit")).toEqual(DEFAULT_PROPS.handleSubmit);
  });

  describe("<S.PaymentInput /> ", () => {
    it("should render", () => {
      const inputs = renderCreditCardForm(DEFAULT_PROPS).find(S.PaymentInput);

      expect(inputs).toHaveLength(3);
    });

    it("should contain <S.ErrorMessage> if error occurs", () => {
      const CARD_ERRORS = {
        cvv: "",
        expirationMonth: "",
        expirationYear: "Expiration year is invalid",
        number: "Wrong number",
      };

      const inputs = renderCreditCardForm({
        ...DEFAULT_PROPS,
        cardErrors: CARD_ERRORS,
      }).find(S.PaymentInput);

      expect(
        inputs
          .at(0)
          .find(S.ErrorMessage)
          .text()
      ).toEqual(CARD_ERRORS.number);
      expect(
        inputs
          .at(2)
          .find(S.ErrorMessage)
          .text()
      ).toEqual(CARD_ERRORS.expirationYear);
    });

    describe("<PaymentLabel />", () => {
      it("should render", () => {
        const labels = renderCreditCardForm(DEFAULT_PROPS).find(S.PaymentLabel);

        expect(labels).toHaveLength(3);
      });

      it("should have `isFocused` set to true if `focusedInputName` prop is equal to input name", () => {
        const labels = renderCreditCardForm({
          ...DEFAULT_PROPS,
          focusedInputName: "ccCsc",
        }).find(S.PaymentLabel);

        expect(labels.at(1).prop("isFocused")).toEqual(true);
      });

      it("should have `isFocused` set to true if input has value", () => {
        const CARD_VALUES = {
          ccCsc: "",
          ccExp: "",
          ccNumber: "3333",
        };

        const labels = renderCreditCardForm({
          ...DEFAULT_PROPS,
          values: CARD_VALUES,
        }).find(S.PaymentLabel);

        expect(labels.at(0).prop("isFocused")).toEqual(true);
      });
    });
  });
});
