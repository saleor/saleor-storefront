import { Formik } from "formik";
import React from "react";

import { Radio } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

export const statuses = [
  { token: "charged", label: "Charged" },
  { token: "fully-refunded", label: "Fully refunded" },
  { token: "not-charged", label: "Not charged" },
];

/**
 * Dummy payment gateway.
 */
const DummyPaymentGateway: React.FC<IProps> = ({
  processPayment,
  formRef,
  formId,
  initialStatus,
}: IProps) => {
  return (
    <Formik
      initialValues={{ status: initialStatus || statuses[0].token }}
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
          {statuses.map(({ token, label }) => {
            return (
              <S.Status key={token}>
                <Radio
                  data-cy={`checkoutPaymentGatewayDummyStatus${token}Input`}
                  key={token}
                  type="radio"
                  name="status"
                  value={token}
                  checked={values.status === token}
                  onChange={handleChange}
                >
                  <span
                    data-cy={`checkoutPaymentGatewayDummyStatus${token}Label`}
                  >
                    {label}
                  </span>
                </Radio>
              </S.Status>
            );
          })}
        </S.Form>
      )}
    </Formik>
  );
};

export { DummyPaymentGateway };
