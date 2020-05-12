import React, { useCallback } from "react";

import { InputSelect, TextField } from "@components/molecules";

import * as S from "./styles";
import { PropsWithFormik } from "./types";

import { commonMessages } from "@saleor/intl"
import { useIntl } from "react-intl";

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
  includeEmail = false,
}) => {
  const intl = useIntl();

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
            data-cy="addressFormFirstName"
            name="firstName"
            label={intl.formatMessage(commonMessages.firstName)}
            value={values!.firstName}
            autoComplete="given-name"
            errors={fieldErrors!.firstName}
            {...basicInputProps()}
          />
          <TextField
            data-cy="addressFormLastName"
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
            data-cy="addressFormCompanyName"
            name="companyName"
            label=
            {
              intl.formatMessage({
                defaultMessage: "Company Name (Optional)",
                description: "company name label",
              })
            }
            value={values!.companyName}
            autoComplete="organization"
            errors={fieldErrors!.companyName}
            {...basicInputProps()}
          />
          <TextField
            data-cy="addressFormPhone"
            name="phone"
            label={intl.formatMessage(commonMessages.phone)}
            value={values!.phone}
            autoComplete="tel"
            errors={fieldErrors!.phone}
            {...basicInputProps()}
          />
        </S.RowWithTwoCells>
        <S.RowWithOneCell>
          <TextField
            data-cy="addressFormStreetAddress1"
            name="streetAddress1"
            label=
            {
              intl.formatMessage({
                defaultMessage: "Address line 1",
                description: "Address line 1 label",
              })
            }
            value={values!.streetAddress1}
            autoComplete="address-line1"
            errors={fieldErrors!.streetAddress1}
            {...basicInputProps()}
          />
        </S.RowWithOneCell>
        <S.RowWithOneCell>
          <TextField
            data-cy="addressFormStreetAddress2"
            name="streetAddress2"
            label=
            {
              intl.formatMessage({
                defaultMessage: "Address line 2",
                description: "Address line 2 label",
              })
            }
            value={values!.streetAddress2}
            autoComplete="address-line2"
            errors={fieldErrors!.streetAddress2}
            {...basicInputProps()}
          />
        </S.RowWithOneCell>
        <S.RowWithTwoCells>
          <TextField
            data-cy="addressFormCity"
            name="city"
            label={intl.formatMessage(commonMessages.city)}
            value={values!.city}
            autoComplete="address-level1"
            errors={fieldErrors!.city}
            {...basicInputProps()}
          />
          <TextField
            data-cy="addressFormPostalCode"
            name="postalCode"
            label=
            {
              intl.formatMessage({
                defaultMessage: "ZIP/Postal Code",
                description: "ZIP/Postal Code label",
              })
            }
            value={values!.postalCode}
            autoComplete="postal-code"
            errors={fieldErrors!.postalCode}
            {...basicInputProps()}
          />
        </S.RowWithTwoCells>
        <S.RowWithTwoCells>
          <InputSelect
            inputProps={{
              "data-cy": "addressFormCountry",
            }}
            defaultValue={defaultValue}
            label={intl.formatMessage(commonMessages.country)}
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
          />
          <TextField
            data-cy="addressFormCountryArea"
            name="countryArea"
            label=
            {
              intl.formatMessage({
                defaultMessage: "State/province",
                description: "State/province label",
              })
            }
            value={values!.countryArea}
            autoComplete="address-level2"
            errors={fieldErrors!.countryArea}
            {...basicInputProps()}
          />
        </S.RowWithTwoCells>
        {includeEmail && (
          <S.RowWithTwoCells>
            <TextField
              data-cy="addressFormEmail"
              name="email"
              label={intl.formatMessage(commonMessages.email)}
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
