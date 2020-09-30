import { Formik } from "formik";
import React, { useState } from "react";
import { pick } from "lodash";

import { TextField } from "@components/molecules";
import { useIntl } from "react-intl";
import { CreditCardInput } from "@components/atoms";
import { CreditCardField } from "@components/atoms/CreditCardInput/types";
import { IFormError } from "@types";
import { IProps } from "./types";
import * as S from "./styles";

const NAME_REGEX = /^[a-zA-Z\s]*$/;

type CreditCardData = Record<CreditCardField | "nameOnCard", string>;

const initialValues: CreditCardData = {
  nameOnCard: "",
  cardNumber: "",
  cvc: "",
  expiryDate: "",
};

/**
 * Dummy payment gateway.
 */
const DummyPaymentGateway: React.FC<IProps> = ({
  processPayment,
  formRef,
  formId,
}: IProps) => {
  const intl = useIntl();
  const [cardErrors, setCardErrors] = useState<IFormError[]>([]);
  const [showEmptyErrors, setShowEmptyErrors] = useState<boolean>(false);

  const getBareValue = (value: string) => value.replaceAll(/[,\/ ]/g, "");

  const getNameErrors = (name: string) => {
    if (!showEmptyErrors) {
      return;
    }

    if (!RegExp(NAME_REGEX).test(name)) {
      return [
        {
          message: intl.formatMessage({
            defaultMessage: "Name can only contain letters and spaces",
          }),
        },
      ];
    }

    if (name.length < 1) {
      return [
        {
          message: intl.formatMessage({
            defaultMessage: "Name cannot be empty",
          }),
        },
      ];
    }
  };

  const shouldEnableProceed = (values: CreditCardData) =>
    cardErrors.length < 1 && !getNameErrors(values.nameOnCard);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        if (!shouldEnableProceed(values)) {
          setShowEmptyErrors(true);
          return;
        }

        processPayment(getBareValue(values.cardNumber));
        setSubmitting(false);
      }}
    >
      {({ handleChange, handleSubmit, handleBlur, values }) => (
        <S.Form
          id={formId}
          ref={formRef}
          onSubmit={handleSubmit}
          data-test="dummyPaymentGatewayForm"
        >
          <TextField
            name="nameOnCard"
            label={intl.formatMessage({ defaultMessage: "Name on Card" })}
            value={values.nameOnCard}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={getNameErrors(values.nameOnCard)}
            onFocus={() => setShowEmptyErrors(false)}
          />
          <CreditCardInput
            errors={cardErrors}
            setErrors={setCardErrors}
            showEmptyErrors={showEmptyErrors}
            setShowEmptyErrors={setShowEmptyErrors}
            values={pick(values, Object.values(CreditCardField))}
            onChange={handleChange}
            label={intl.formatMessage({ defaultMessage: "Card number" })}
            onBlur={handleBlur}
          />
        </S.Form>
      )}
    </Formik>
  );
};

export { DummyPaymentGateway };
