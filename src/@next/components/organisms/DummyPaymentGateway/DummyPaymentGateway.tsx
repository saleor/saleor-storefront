import { Formik } from "formik";
import React from "react";

import * as S from "./styles";
import { IProps } from "./types";
import { TextField } from "@components/molecules";
import { useIntl } from "react-intl";
import { Input, CreditCardInput } from "@components/atoms";

export const statuses = [
  { token: "charged", label: "Charged" },
  { token: "fully-refunded", label: "Fully refunded" },
  { token: "not-charged", label: "Not charged" },
];

const initialValues = {
  nameOnCard: "",
  cardNumber: "",
  cvc: "",
  expirationDate: "",
};

/**
 * Dummy payment gateway.
 */
const DummyPaymentGateway: React.FC<IProps> = ({
  processPayment,
  formRef,
  formId,
  initialStatus,
}: IProps) => {
  const intl = useIntl();
  return (
    <Formik
      initialValues={{
        ...initialValues,
        status: initialStatus || statuses[0].token,
      }}
      onSubmit={(values, { setSubmitting }) => {
        processPayment(values.status);
        setSubmitting(false);
      }}
    >
      {({
        handleChange,
        handleSubmit,
        handleBlur,
        values,
        isSubmitting,
        isValid,
      }) => (
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
          />
          <CreditCardInput
            values={values}
            onChange={handleChange}
            label={intl.formatMessage({ defaultMessage: "Card number" })}
          ></CreditCardInput>
        </S.Form>
      )}
    </Formik>
  );
};

export { DummyPaymentGateway };
