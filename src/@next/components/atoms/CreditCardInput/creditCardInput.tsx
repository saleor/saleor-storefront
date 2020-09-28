import React from "react";

import { getBackgroundColor } from "@utils/styles";

import { InputLabel } from "../InputLabel";

import * as S from "./styles";
import { IProps } from "./types";

const ONLY_NUMBERS_REGEX = /^[0-9 ]*$/;

enum Field {
  cardNumber = "cardNumber",
  cardCvc = "cardCvc",
  cardExpirationDate = "cardExpirationDate",
}

const fieldLengthContraints = {
  [Field.cardNumber]: 19,
  [Field.cardCvc]: 3,
  [Field.cardExpirationDate]: 4,
};

export const CreditCardInput: React.FC<IProps> = ({
  onBlur,
  onFocus,
  error = false,
  disabled = false,
  values,
  onChange,
}: IProps) => {
  const elementRef = React.useRef(null);
  const [active, setActive] = React.useState(false);
  const [labelBackground, setColor] = React.useState<string>("transparent");

  React.useEffect(() => {
    if (elementRef) {
      const color = getBackgroundColor(elementRef.current);
      setColor(color);
    }
  }, []);

  const handleFocus = React.useCallback(
    e => {
      setActive(true);
      if (onFocus) {
        onFocus(e);
      }
    },
    [setActive, onFocus]
  );

  const handleBlur = React.useCallback(
    e => {
      setActive(false);
      if (onBlur) {
        onBlur(e);
      }
    },
    [setActive, onBlur]
  );

  const handleChange = (field: Field) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;

    if (
      RegExp(ONLY_NUMBERS_REGEX).test(value) ||
      value.length <= fieldLengthContraints[field]
    ) {
      onChange(event);
    }
  };

  const hasAnyValues = () => {
    const { cardNumber, cvc, expirationDate } = values;

    return !!cardNumber && !!cvc && !!expirationDate;
  };

  const formattedCardNumber = () => {
    if (!!!values?.cardNumber) {
      return "";
    }

    return values.cardNumber
      .replaceAll(" ", "")
      .match(/.{1,4}/g)
      .join(" ");
  };

  return (
    <S.Wrapper
      active={active}
      error={error}
      disabled={disabled}
      ref={elementRef}
    >
      <S.Input
        onChange={handleChange(Field.cardNumber)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        name="cardNumber"
        value={formattedCardNumber()}
      />
      <S.BareInput
        onChange={handleChange(Field.cardExpirationDate)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        name="expirationDate"
        value={values.expirationDate}
        placeholder="MM/RR"
      />
      <S.BareInput
        onChange={handleChange(Field.cardCvc)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        type="text"
        name="cvc"
        value={values.cvc}
        placeholder="CVC"
      />
      <InputLabel
        labelBackground={labelBackground}
        active={active || hasAnyValues()}
      >
        Card Number
      </InputLabel>
    </S.Wrapper>
  );
};
