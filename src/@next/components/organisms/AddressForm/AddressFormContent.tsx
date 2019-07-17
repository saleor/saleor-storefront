import { compact } from "lodash";
import React, { useCallback } from "react";

import { TextField } from "@components/molecules";

import { maybe } from "@utils/tsUtils";
import { FormikTouched } from "formik";
import * as S from "./styles";
import { AddressError, AddressErrors, PropsWithFormik } from "./types";

const getInputProps = (
  handleChange: (e: React.ChangeEvent) => void,
  handleBlur: (e: React.FocusEvent) => void
) => (
  name: string,
  label: string,
  errors: AddressErrors,
  value: string,
  touched: FormikTouched<any> | undefined
) => {
  const key = name;
  let addressError: AddressError[] | undefined = maybe(
    () =>
      errors[key as keyof AddressErrors] && [
        errors[key as keyof AddressErrors],
      ],
    []
  );
  if (touched![name] && !value) {
    addressError = [
      {
        field: name,
        message: "Required field!",
      },
    ];
  }
  return {
    errors: addressError,
    label,
    name,
    onBlur: handleBlur,
    onChange: handleChange,
    value,
  };
};

export const AddressFormContent: React.FC<PropsWithFormik> = ({
  formRef,
  handleChange,
  handleBlur,
  errors,
  handleSubmit,
  values,
  touched,
}) => {
  const basicInputProps = useCallback(getInputProps(handleChange, handleBlur), [
    handleChange,
    handleBlur,
  ]);

  // tslint:disable-next-line: no-console
  console.log({ errors });
  return (
    <S.AddressForm ref={formRef} onSubmit={handleSubmit}>
      <S.Wrapper>
        <TextField
          {...basicInputProps(
            "firstName",
            "First name",
            errors,
            values.firstName,
            touched
          )}
        ></TextField>
      </S.Wrapper>
    </S.AddressForm>
  );
};
