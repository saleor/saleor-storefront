import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { CreditCardForm } from ".";
import { IProps } from "./types";

describe("<CreditCardForm />", () => {
  // const CARD_ERRORS = {
  //   cvv: "Error",
  //   expirationMonth: "Expiration month is invalid",
  //   expirationYear: "Expiration year is invalid",
  //   number: "Wrong number",
  // };

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
    cardValues: CARD_VALUES,
    focusedInputName: null,
    formRef: null,
    handleSubmit: jest.fn(),
    inputProps: INPUT_PROPS,
  };

  const renderCreditCardForm = (props: IProps) =>
    shallow(<CreditCardForm {...props} />);

  it("exists", () => {
    const creditCardForm = renderCreditCardForm(DEFAULT_PROPS);

    expect(creditCardForm.exists()).toEqual(true);
  });
});
