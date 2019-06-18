import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { CreditCardFormContent as CreditCardForm } from "./CreditCardFormContent";
import * as S from "./styles";
import { IFormikProps, IProps } from "./types";

describe("<CreditCardForm />", () => {
  const CARD_VALUES = {
    ccCsc: null,
    ccExp: null,
    ccNumber: null,
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
    cardText: {
      ccCsc: "CVC",
      ccExp: "Expiry Date",
      ccNumber: "Number",
    },
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
    // tslint:disable-next-line:no-console
    console.log("creditCardF", creditCardForm.debug());
    expect(creditCardForm.exists()).toEqual(true);
  });

  it("should render <form /> with `onSubmit` prop", () => {
    const form = renderCreditCardForm(DEFAULT_PROPS).find("form");

    expect(form.exists()).toEqual(true);
    expect(form.prop("onSubmit")).toEqual(DEFAULT_PROPS.handleSubmit);
  });

  describe("<S.PaymentInput /> ", () => {
    it("should render  with <S.ErrorMessage> if `error` prop is set to true", () => {
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

      expect(inputs).toHaveLength(3);
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
  });
});
