import React, { useCallback } from "react";
import { useIntl } from "react-intl";

import { InputSelect, TextField } from "@components/molecules";
import { commonMessages } from "@temp/intl";

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
  countriesOptions,
  defaultValue,
  setFieldValue,
  testingContext,
  includeEmail = false,
}) => {
  const basicInputProps = useCallback(
    () => ({ onBlur: handleBlur, onChange: handleChange }),
    [handleChange, handleBlur]
  );
  const intl = useIntl();
  const fieldErrors: any = {};

  if (errors) {
    errors.map(({ field, message }: { field: string; message: string }) => {
      fieldErrors[field] = fieldErrors[field]
        ? [...fieldErrors[field], { message }]
        : [{ message }];
    });
  }

  return (
    <S.AddressForm
      id={formId}
      ref={formRef}
      onSubmit={handleSubmit}
      data-test={testingContext}
    >
      <S.Wrapper>
        <S.RowWithTwoCells>
          <TextField
            name="firstName"
            label={intl.formatMessage(commonMessages.firstName)}
            value={values!.firstName}
            autoComplete="given-name"
            errors={fieldErrors!.firstName}
            {...basicInputProps()}
          />
          <TextField
            name="lastName"
            label={intl.formatMessage(commonMessages.lastName)}
            value={values!.lastName}
            autoComplete="family-name"
            errors={fieldErrors!.lastName}
            {...basicInputProps()}
          />
        </S.RowWithTwoCells>
        <S.RowWithTwoCells>
          <TextField
            name="companyName"
            label={intl.formatMessage({
              defaultMessage: "Company Name (Optional)",
            })}
            value={values!.companyName}
            autoComplete="organization"
            errors={fieldErrors!.companyName}
            {...basicInputProps()}
          />
          <TextField
            name="phone"
            label={intl.formatMessage(commonMessages.phone)}
            value={values!.phone || undefined}
            autoComplete="tel"
            errors={fieldErrors!.phone}
            {...basicInputProps()}
          />
        </S.RowWithTwoCells>
        <S.RowWithOneCell>
          <TextField
            name="streetAddress1"
            label={intl.formatMessage({ defaultMessage: "Address line 1" })}
            value={values!.streetAddress1}
            autoComplete="address-line1"
            errors={fieldErrors!.streetAddress1}
            {...basicInputProps()}
          />
        </S.RowWithOneCell>
        <S.RowWithOneCell>
          <TextField
            name="streetAddress2"
            label={intl.formatMessage({ defaultMessage: "Address line 2" })}
            value={values!.streetAddress2}
            autoComplete="address-line2"
            errors={fieldErrors!.streetAddress2}
            {...basicInputProps()}
          />
        </S.RowWithOneCell>
        <S.RowWithTwoCells>
          <TextField
            name="city"
            label={intl.formatMessage({ defaultMessage: "City" })}
            value={values!.city}
            autoComplete="address-level2"
            errors={fieldErrors!.city}
            {...basicInputProps()}
          />
          <TextField
            name="postalCode"
            label={intl.formatMessage({ defaultMessage: "ZIP/Postal Code" })}
            value={values!.postalCode}
            autoComplete="postal-code"
            errors={fieldErrors!.postalCode}
            {...basicInputProps()}
          />
        </S.RowWithTwoCells>
        <S.RowWithTwoCells>
          <InputSelect
            defaultValue={defaultValue}
            label={intl.formatMessage({ defaultMessage: "Country" })}
            name="country"
            options={countriesOptions}
            value={
              values!.country &&
              countriesOptions &&
              countriesOptions!.find(
                option => option.code === values!.country!.code
              )
            }
            onChange={(value: any, name: any) => setFieldValue(name, value)}
            optionLabelKey="country"
            optionValueKey="code"
            errors={fieldErrors!.country}
            autoComplete="country"
          />
          <TextField
            name="countryArea"
            label={intl.formatMessage({ defaultMessage: "State/province" })}
            value={values!.countryArea}
            autoComplete="address-level1"
            errors={fieldErrors!.countryArea}
            {...basicInputProps()}
          />
        </S.RowWithTwoCells>
        {includeEmail && (
          <S.RowWithTwoCells>
            <TextField
              name="email"
              label={intl.formatMessage(commonMessages.shortEmail)}
              value={values!.email}
              autoComplete="email"
              errors={fieldErrors!.email}
              {...basicInputProps()}
            />
          </S.RowWithTwoCells>
        )}
      </S.Wrapper>
    </S.AddressForm>
  );
};
