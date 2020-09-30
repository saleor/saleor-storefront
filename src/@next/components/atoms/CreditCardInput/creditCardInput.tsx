import React from "react";
import { getBackgroundColor } from "@utils/styles";
import { usePaymentInputs } from "react-payment-inputs";
import { ErrorMessage } from "@components/atoms";
import { reduce } from "lodash";
import { IFormError } from "@types";
import { useIntl } from "react-intl";
import { CreditCardField, CreditCardInputProps } from "./types";
import * as S from "./styles";
import { InputLabel } from "../InputLabel";

const CARD_NUMBER_MAX_LENGTH = 16;
const CARD_SLICES_REGEX = /.{1,4}/g;

export const CreditCardInput: React.FC<CreditCardInputProps> = ({
  onBlur,
  onFocus,
  values,
  onChange,
  label,
  errors,
  setErrors,
  showEmptyErrors,
  setShowEmptyErrors,
}: CreditCardInputProps) => {
  const intl = useIntl();
  const elementRef = React.useRef(null);
  const [active, setActive] = React.useState(false);
  const [labelBackground, setColor] = React.useState<string>("transparent");

  const defaultMessages = {
    EMPTY_CARD_NUMBER: intl.formatMessage({
      defaultMessage: "Enter a card number",
    }),
    EMPTY_EXPIRY_DATE: intl.formatMessage({
      defaultMessage: "Enter an expiry date",
    }),
    EMPTY_CVC: intl.formatMessage({
      defaultMessage: "Enter a CVC",
    }),
    INVALID_CARD_NUMBER: intl.formatMessage({
      defaultMessage: "Card number is invalid",
    }),
    INVALID_EXPIRY_DATE: intl.formatMessage({
      defaultMessage: "Expiry date is invalid",
    }),
    INVALID_CVC: intl.formatMessage({
      defaultMessage: "CVC is invalid",
    }),
    MONTH_OUT_OF_RANGE: intl.formatMessage({
      defaultMessage: "Expiry month must be between 01 and 12",
    }),
    YEAR_OUT_OF_RANGE: intl.formatMessage({
      defaultMessage: "Expiry year cannot be in the past",
    }),
    DATE_OUT_OF_RANGE: intl.formatMessage({
      defaultMessage: "Expiry date cannot be in the past",
    }),
  };

  const handleDisplayError = (
    message: string,
    fields: Record<CreditCardField, string | undefined>
  ) => {
    const errors = reduce(
      fields,
      (result: IFormError[], value: string | undefined, key: string) => {
        if (value) {
          return [
            ...result,
            {
              message: value,
              field: key,
            },
          ];
        }

        return result;
      },
      [] as IFormError[]
    );

    setErrors(errors);
  };

  const filteredErrors = () =>
    errors.filter(
      ({ message, field }) => values[field as CreditCardField].length > 0
    );

  const {
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
  } = usePaymentInputs({
    onError: handleDisplayError,
    errorMessages: defaultMessages,
  });

  React.useEffect(() => {
    if (elementRef) {
      const color = getBackgroundColor(elementRef.current);
      setColor(color);
    }
  }, []);

  const handleFocus = React.useCallback(
    e => {
      setActive(true);
      setShowEmptyErrors(false);
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
    const { cardNumber, cvc, expiryDate } = values;

    return !!cardNumber || !!cvc || !!expiryDate;
  };

  const formattedCardNumber = () =>
    values.cardNumber
      .replaceAll(" ", "")
      .slice(0, CARD_NUMBER_MAX_LENGTH)
      .match(CARD_SLICES_REGEX)
      ?.join(" ") || "";

  const shouldShowWrapperError = () => {
    if (errors.length < 1) {
      return false;
    }

    return (
      showEmptyErrors || Object.values(values).some((value: string) => !!value)
    );
  };

  return (
    <>
      <S.Wrapper
        active={active}
        error={shouldShowWrapperError()}
        ref={elementRef}
      >
        <S.Input
          {...getCardNumberProps({ onChange })}
          placeholder=""
          name="cardNumber"
          value={formattedCardNumber()}
          onFocus={handleFocus}
          onBlur={handleBlur}
          labelBackground={null}
        />
        <S.BareInput
          {...getExpiryDateProps({ onChange })}
          value={values.expiryDate}
          name="expiryDate"
          placeholder="MM/RR"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <S.BareInput
          {...getCVCProps({ onChange })}
          type="text"
          name="cvc"
          onFocus={handleFocus}
          onBlur={handleBlur}
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
      <ErrorMessage errors={showEmptyErrors ? errors : filteredErrors()} />
    </>
  );
};
