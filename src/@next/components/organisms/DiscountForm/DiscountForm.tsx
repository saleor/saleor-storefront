import { Formik } from "formik";
import React from "react";

import { Button, Chip, ErrorMessage, Input } from "@components/atoms";
import * as S from "./styles";
import { IProps } from "./types";

export const DiscountForm: React.FC<IProps> = ({
  handleSubmit,
  discount,
  errors,
  formId,
  formRef,
}: IProps) => {
  const promoCode = discount && discount.promoCode;

  const [inputCode, setInputCode] = React.useState("");
  const [tempPromoCode, setTempPromoCode] = React.useState(promoCode);

  const handleApplyBtnClick = (newInputCode: string) => {
    setTempPromoCode(newInputCode);
    setInputCode("");
  };

  const handleRemoveBtnClick = (newInputCode: string) => {
    setTempPromoCode(undefined);
    setInputCode(newInputCode);
  };

  return (
    <Formik
      initialValues={{
        errors,
        inputCode,
        tempPromoCode,
      }}
      enableReinitialize={true}
      onSubmit={(values, { setSubmitting }) => {
        if (handleSubmit) {
          handleSubmit({
            promoCode: values.tempPromoCode,
          });
        }
        setSubmitting(false);
      }}
    >
      {({
        handleChange,
        handleSubmit,
        handleBlur,
        values,
        setFieldValue,
        setFieldTouched,
      }) => {
        const hasErrors = !!(values.errors && values.errors.length);

        return (
          <S.DiscountForm id={formId} ref={formRef} onSubmit={handleSubmit}>
            <S.Input>
              <S.InputWithButton>
                <S.InputWrapper>
                  <Input
                    data-cy="checkoutPaymentPromoCodeInput"
                    error={hasErrors}
                    name="inputCode"
                    value={values.inputCode}
                    label="Promo Code"
                    onChange={handleChange}
                  />
                </S.InputWrapper>
                <S.ButtonWrapper>
                  <Button
                    type="button"
                    dataCy="checkoutPaymentApplyPromoCodeButton"
                    onClick={() => handleApplyBtnClick(values.inputCode)}
                  >
                    Apply
                  </Button>
                </S.ButtonWrapper>
              </S.InputWithButton>
              <ErrorMessage errors={values.errors} />
            </S.Input>
            {values.tempPromoCode && (
              <>
                <span>Promo code:</span>
                <S.ChipsWrapper>
                  <Chip onClose={() => handleRemoveBtnClick(values.inputCode)}>
                    <span data-cy="checkoutPaymentPromoCodeChip">
                      {values.tempPromoCode}
                    </span>
                  </Chip>
                </S.ChipsWrapper>
              </>
            )}
          </S.DiscountForm>
        );
      }}
    </Formik>
  );
};
