import React from "react";

import { getBackgroundColor } from "@utils/styles";

import { InputLabel } from "../InputLabel";

import * as S from "./styles";
import { IProps } from "./types";

const COMMON_FIELD_REGEX = /^[0-9 ]*$/;
// check it again
const EXPIRY_DATE_FIELD_REGEX = /^[0-9]{0,2} ?\/? ?[0-9]{0,2}$/;

enum Field {
  cardNumber = "cardNumber",
  cardCvc = "cardCvc",
  cardExpirationDate = "cardExpirationDate",
}

const fieldLengthContraints = {
  [Field.cardNumber]: 19,
  [Field.cardCvc]: 3,
  [Field.cardExpirationDate]: 7,
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

    if (field === Field.cardExpirationDate && !validateExpirationDate(value)) {
      return;
    }

    if (
      value.length > fieldLengthContraints[field] ||
      !validateFormat(field, value)
    ) {
      return;
    }

    onChange(event);
  };

  const validateFormat = (field: Field, value: string) => {
    const regexToCheck =
      field === Field.cardExpirationDate
        ? EXPIRY_DATE_FIELD_REGEX
        : COMMON_FIELD_REGEX;

    return RegExp(regexToCheck).test(value);
  };

  const validateExpirationDate = (value: string) => {
    const dateStrings = getBareValue(value).match(/.{1,2}/g);

    if (dateStrings) {
      const month = Number(dateStrings[0]);
      const year = Number(dateStrings[1]);

      if (month > 12) {
        return false;
      }

      if (!dateStrings[1] || dateStrings[1].length < 2) {
        return true;
      }

      if (year + 2000 < new Date().getFullYear()) {
        console.log(dateStrings, {
          y: year + 2000,
          l: new Date().getFullYear(),
        });
        return false;
      }
    }

    return true;
  };

  const formattedCardNumber = () =>
    getBareValue(values.cardNumber)
      .match(/.{1,4}/g)
      ?.join(" ") || "";

  const formattedExpirationDate = () => {
    const { expirationDate } = values;

    if (expirationDate.length === 1 && Number(expirationDate) > 1) {
      return `0${expirationDate}`;
    }

    return (
      getBareValue(expirationDate)
        .match(/.{1,2}/g)
        ?.join(" / ") || ""
    );
  };

  const getBareValue = (value: string) =>
    value.replaceAll("/", "").replaceAll(" ", "");

  const hasAnyValues = () => {
    const { cardNumber, cvc, expirationDate } = values;

    return !!cardNumber && !!cvc && !!expirationDate;
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
        value={formattedExpirationDate()}
        onFocus={handleFocus}
        onBlur={handleBlur}
        name="expirationDate"
        onChange={handleChange(Field.cardExpirationDate)}
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
