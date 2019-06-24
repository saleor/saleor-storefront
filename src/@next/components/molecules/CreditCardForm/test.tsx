import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { ErrorMessage } from "@components/atoms";
import { CreditCardFormContent as CreditCardForm } from "./CreditCardFormContent";
import * as S from "./styles";
import { PropsWithFormik } from "./types";

describe("<CreditCardForm />", () => {
  const CARD_TEXT = {
    ccCsc: "CVC",
    ccExp: "Expiry Date",
    ccNumber: "Number",
  };

  const DEFAULT_PROPS = {
    cardErrors: {},
    disabled: false,
    handleChange: jest.fn(),
    handleSubmit: jest.fn(),
    labelsText: CARD_TEXT,
  };

  const renderCreditCardForm = (props: PropsWithFormik) =>
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

    it("should render <ErrorMessage> with errors list if error occurs", () => {
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
          .at(1)
          .find(ErrorMessage)
          .prop("errors")
      ).toEqual([]);
      expect(
        inputs
          .at(0)
          .find(ErrorMessage)
          .prop("errors")
      ).toEqual([{ message: CARD_ERRORS.number }]);
      expect(
        inputs
          .at(2)
          .find(ErrorMessage)
          .prop("errors")
      ).toEqual([{ message: CARD_ERRORS.expirationYear }]);
    });
  });
});
