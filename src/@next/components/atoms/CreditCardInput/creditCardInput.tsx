import React from "react";
import { getBackgroundColor } from "@utils/styles";
import { InputLabel } from "../InputLabel";
import * as S from "./styles";
import { CreditCardInputProps } from "./types";
import { usePaymentInputs } from "react-payment-inputs";

const CARD_NUMBER_MAX_LENGTH = 16;
const CARD_SLICES_REGEX = /.{1,4}/g;

export const CreditCardInput: React.FC<CreditCardInputProps> = ({
  onBlur,
  onFocus,
  error = false,
  disabled = false,
  values,
  onChange,
  label,
}: CreditCardInputProps) => {
  const elementRef = React.useRef(null);
  const [active, setActive] = React.useState(false);
  const [labelBackground, setColor] = React.useState<string>("transparent");
  const {
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
  } = usePaymentInputs();

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

  const hasAnyValues = () => {
    const { cardNumber, cvc, expirationDate } = values;

    return !!cardNumber || !!cvc || !!expirationDate;
  };

  const formattedCardNumber = () =>
    values.cardNumber
      .replaceAll(" ", "")
      .slice(0, CARD_NUMBER_MAX_LENGTH)
      .match(CARD_SLICES_REGEX)
      ?.join(" ") || "";

  return (
    <S.Wrapper
      active={active}
      error={error}
      disabled={disabled}
      ref={elementRef}
    >
      <S.Input
        {...getCardNumberProps({ onChange })}
        labelBackground={null}
        placeholder=""
        onFocus={handleFocus}
        onBlur={handleBlur}
        name="cardNumber"
        value={formattedCardNumber()}
      />
      <S.BareInput
        {...getExpiryDateProps({ onChange })}
        value={values.expirationDate}
        onFocus={handleFocus}
        onBlur={handleBlur}
        name="expirationDate"
        placeholder="MM/RR"
      />
      <S.BareInput
        {...getCVCProps({ onChange })}
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
        {label}
      </InputLabel>
    </S.Wrapper>
  );
};
