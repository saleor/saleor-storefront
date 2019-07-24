import { I18n } from "@lingui/react";
import React, { useCallback, useContext } from "react";

import { TextField } from "@components/molecules";
import { maybe } from "@utils/tsUtils";

import * as S from "./styles";
import { PropsWithFormik } from "./types";

export const AddressFormContent: React.FC<PropsWithFormik> = ({
  formRef,
  handleChange,
  handleBlur,
  errors,
  handleSubmit,
  values,
}) => {
  const basicInputProps = useCallback(
    () => ({ onBlur: handleBlur, onChange: handleChange }),
    [handleChange, handleBlur]
  );

  return (
    <I18n>
      {({ i18n }) => (
        <S.AddressForm ref={formRef} onSubmit={handleSubmit}>
          <S.Wrapper>
            <S.RowWithTwoCells>
              <TextField
                name="firstName"
                label={i18n._("First Name")}
                value={values.firstName}
                autoComplete="given-name"
                required={true}
                errors={maybe(() => errors!.firstName)}
                {...basicInputProps()}
              />
              <TextField
                name="lastName"
                label={i18n._("Last Name")}
                value={values.lastName}
                autoComplete="family-name"
                required={true}
                errors={maybe(() => errors!.lastName)}
                {...basicInputProps()}
              />
            </S.RowWithTwoCells>
            <S.RowWithTwoCells>
              <TextField
                name="companyName"
                label={i18n._("Company Name (Optional)")}
                value={values.companyName}
                autoComplete="organization"
                required={true}
                errors={maybe(() => errors!.companyName)}
                {...basicInputProps()}
              />
              <TextField
                name="phone"
                label={i18n._("Phone")}
                value={values.phone}
                autoComplete="tel"
                required={true}
                errors={maybe(() => errors!.phone)}
                {...basicInputProps()}
              />
            </S.RowWithTwoCells>
            <S.RowWithOneCell>
              <TextField
                name="streetAddress1"
                label={i18n._("Address line 1")}
                value={values.streetAddress1}
                autoComplete="address-line1"
                required={true}
                errors={maybe(() => errors!.streetAddress1)}
                {...basicInputProps()}
              />
            </S.RowWithOneCell>
            <S.RowWithOneCell>
              <TextField
                name="streetAddress2"
                label={i18n._("Address line 2")}
                value={values.streetAddress2}
                autoComplete="address-line2"
                required={true}
                errors={maybe(() => errors!.streetAddress2)}
                {...basicInputProps()}
              />
            </S.RowWithOneCell>
            <S.RowWithTwoCells>
              <TextField
                name="city"
                label={i18n._("City")}
                value={values.city}
                autoComplete="address-level1"
                required={true}
                errors={maybe(() => errors!.city)}
                {...basicInputProps()}
              />
              <TextField
                name="postalCode"
                label={i18n._("ZIP/Postal Code")}
                value={values.postalCode}
                autoComplete="postal-code"
                required={true}
                errors={maybe(() => errors!.postalCode)}
                {...basicInputProps()}
              />
            </S.RowWithTwoCells>
            <S.RowWithTwoCells>
              <TextField
                name="country"
                label={i18n._("Country")}
                value={values.country}
                autoComplete="country"
                required={true}
                errors={maybe(() => errors!.country)}
                {...basicInputProps()}
              />
              <TextField
                name="countryArea"
                label={i18n._("State/province")}
                value={values.countryArea}
                autoComplete="address-level2"
                required={true}
                errors={maybe(() => errors!.countryArea)}
                {...basicInputProps()}
              />
            </S.RowWithTwoCells>
          </S.Wrapper>
        </S.AddressForm>
      )}
    </I18n>
  );
};
