import { Formik } from "formik";
import React from "react";

// import { Radio } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

export const codStatuses = [
  { token: "not-charged", label: "Not charged" },
];

/**
 * CashOnDelivery payment gateway.
 */
const CashOnDeliveryPaymentGateway: React.FC<IProps> = ({
  processPayment,
  formRef,
  formId,
  initialStatus,
}: IProps) => {
  return (
    <Formik
      initialValues={{ status: initialStatus || codStatuses[0].token }}
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
        <S.Form id={formId} ref={formRef} onSubmit={handleSubmit}>
    
        </S.Form>
      )}
    </Formik>
  );
};

export { CashOnDeliveryPaymentGateway };
