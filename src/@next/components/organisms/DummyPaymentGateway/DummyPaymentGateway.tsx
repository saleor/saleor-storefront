import { Formik } from "formik";
import React, { useState } from "react";

import { Radio } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

const statuses = [
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
}: IProps) => {
  const [selectedStatusToken, setSelectedStatusToken] = useState(
    statuses[0].token
  );

  return (
    <Formik
      initialValues={selectedStatusToken}
      onSubmit={(statusToken, { setSubmitting }) => {
        processPayment(statusToken);
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
        <S.Form ref={formRef} onSubmit={handleSubmit}>
          {statuses.map(({ token, label }) => {
            return (
              <S.Status>
                <Radio
                  key={token}
                  type="radio"
                  name="status"
                  value={token}
                  checked={selectedStatusToken === token}
                  onChange={() => setSelectedStatusToken(token)}
                >
                  {label}
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