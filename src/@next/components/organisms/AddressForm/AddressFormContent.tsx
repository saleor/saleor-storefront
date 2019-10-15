import React, { useCallback } from "react";

import { InputSelect, TextField } from "@components/molecules";

import * as S from "./styles";
import { PropsWithFormik } from "./types";

export const AddressFormContent: React.FC<PropsWithFormik> = ({
  formRef,
  handleChange,
  handleBlur,
  formId,
  errors,
  handleSubmit,
  values,
  options,
  defaultValue,
  setFieldValue,
}) => {
  const basicInputProps = useCallback(
    () => ({ onBlur: handleBlur, onChange: handleChange }),
    [handleChange, handleBlur]
  );

  const fieldErrors: any = {};

  if (errors) {
    errors.map(({ field, message }: { field: string; message: string }) => {
      fieldErrors[field] = fieldErrors[field]
        ? [...fieldErrors[field], { message }]
        : [{ message }];
    });
  }

  return (
    <S.AddressForm id={formId} ref={formRef} onSubmit={handleSubmit}>
      <S.Wrapper>
        <S.RowWithTwoCells>
          <TextField
            name="firstName"
            label="First Name"
            value={values!.firstName}
            autoComplete="given-name"
            errors={fieldErrors!.firstName}
            {...basicInputProps()}
          />
          <TextField
            name="lastName"
            label="Last Name"
            value={values!.lastName}
            autoComplete="family-name"
            errors={fieldErrors!.lastName}
            {...basicInputProps()}
          />
        </S.RowWithTwoCells>
        <S.RowWithTwoCells>
          <TextField
            name="companyName"
            label="Company Name (Optional)"
            value={values!.companyName}
            autoComplete="organization"
            errors={fieldErrors!.companyName}
            {...basicInputProps()}
          />
          <TextField
            name="phone"
            label="Phone"
            value={values!.phone}
            autoComplete="tel"
            errors={fieldErrors!.phone}
            {...basicInputProps()}
          />
        </S.RowWithTwoCells>
        <S.RowWithOneCell>
          <TextField
            name="streetAddress1"
            label="Address line 1"
            value={values!.streetAddress1}
            autoComplete="address-line1"
            errors={fieldErrors!.streetAddress1}
            {...basicInputProps()}
          />
        </S.RowWithOneCell>
        <S.RowWithOneCell>
          <TextField
            name="streetAddress2"
            label="Address line 2"
            value={values!.streetAddress2}
            autoComplete="address-line2"
            errors={fieldErrors!.streetAddress2}
            {...basicInputProps()}
          />
        </S.RowWithOneCell>
        <S.RowWithTwoCells>
          <TextField
            name="city"
            label="City"
            value={values!.city}
            autoComplete="address-level1"
            errors={fieldErrors!.city}
            {...basicInputProps()}
          />
          <TextField
            name="postalCode"
            label="ZIP/Postal Code"
            value={values!.postalCode}
            autoComplete="postal-code"
            errors={fieldErrors!.postalCode}
            {...basicInputProps()}
          />
        </S.RowWithTwoCells>
        <S.RowWithTwoCells>
          <InputSelect
            defaultValue={defaultValue}
            label="Country"
            name="country"
            options={options}
            value={
              values!.country &&
              options &&
              options!.find(option => option.code === values!.country!.code)
            }
            onChange={(value: any, name: any) => setFieldValue(name, value)}
            optionLabelKey="country"
            optionValueKey="code"
          />
          <TextField
            name="countryArea"
            label="State/province"
            value={values!.countryArea}
            autoComplete="address-level2"
            errors={fieldErrors!.countryArea}
            {...basicInputProps()}
          />
        </S.RowWithTwoCells>
      </S.Wrapper>
    </S.AddressForm>
  );
};
