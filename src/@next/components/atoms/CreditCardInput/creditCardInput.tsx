import React from "react";

import { getBackgroundColor } from "@utils/styles";

import { InputLabel } from "../InputLabel";
import { useIntl } from "react-intl";

import * as S from "./styles";
import { IProps } from "./types";

export const CreditCardInput: React.FC<IProps> = ({
  onBlur,
  onFocus,
  contentLeft = null,
  contentRight = null,
  error = false,
  disabled = false,
  placeholder,
  label,
  value,
  onChange,
  ...props
}: IProps) => {
  const elementRef = React.useRef(null);
  const [active, setActive] = React.useState(false);
  const [labelBackground, setColor] = React.useState<string>("transparent");
  const intl = useIntl();

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

  return (
    <S.Wrapper
      active={active}
      error={error}
      disabled={disabled}
      ref={elementRef}
    >
      <S.Input
        onFocus={handleFocus}
        onBlur={handleBlur}
        name="cardNumber"
        value={values.cardNumber}
        // error={hasErrors}
      />
      <S.BareInput
        onFocus={handleFocus}
        onBlur={handleBlur}
        type="text"
        name="cvc"
        value={values.cvc}
        placeholder="MM/RR"
      />
      <S.BareInput
        onFocus={handleFocus}
        onBlur={handleBlur}
        name="cardNumber"
        value={values.cardNumber}
        placeholder="CVC"
      />
      {label && (
        <InputLabel
          labelBackground={labelBackground}
          active={active || !!value}
        >
          {label}
        </InputLabel>
      )}
      {/* </S.InputWrapper> */}
    </S.Wrapper>
  );
};
