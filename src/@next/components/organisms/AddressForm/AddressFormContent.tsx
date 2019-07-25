import React, { useCallback } from "react";

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
    <S.AddressForm ref={formRef} onSubmit={handleSubmit}>
      <S.Wrapper>
        <S.RowWithTwoCells>
          <TextField
            name="firstName"
            label="First Name"
            value={values!.firstName || ""}
            autoComplete="given-name"
            required={true}
            errors={maybe(() => errors!.firstName)}
            {...basicInputProps()}
          />
          <TextField
            name="lastName"
            label="Last Name"
            value={values!.lastName || ""}
            autoComplete="family-name"
            required={true}
            errors={maybe(() => errors!.lastName)}
            {...basicInputProps()}
          />
        </S.RowWithTwoCells>
        <S.RowWithTwoCells>
          <TextField
            name="companyName"
            label="Company Name (Optional)"
            value={values!.companyName || ""}
            autoComplete="organization"
            required={true}
            errors={maybe(() => errors!.companyName)}
            {...basicInputProps()}
          />
          <TextField
            name="phone"
            label="Phone"
            value={values!.phone || ""}
            autoComplete="tel"
            required={true}
            errors={maybe(() => errors!.phone)}
            {...basicInputProps()}
          />
        </S.RowWithTwoCells>
        <S.RowWithOneCell>
          <TextField
            name="streetAddress1"
            label="Address line 1"
            value={values!.streetAddress1 || ""}
            autoComplete="address-line1"
            required={true}
            errors={maybe(() => errors!.streetAddress1)}
            {...basicInputProps()}
          />
        </S.RowWithOneCell>
        <S.RowWithOneCell>
          <TextField
            name="streetAddress2"
            label="Address line 2"
            value={values!.streetAddress2 || ""}
            autoComplete="address-line2"
            required={true}
            errors={maybe(() => errors!.streetAddress2)}
            {...basicInputProps()}
          />
        </S.RowWithOneCell>
        <S.RowWithTwoCells>
          <TextField
            name="city"
            label="City"
            value={values!.city || ""}
            autoComplete="address-level1"
            required={true}
            errors={maybe(() => errors!.city)}
            {...basicInputProps()}
          />
          <TextField
            name="postalCode"
            label="ZIP/Postal Code"
            value={values!.postalCode || ""}
            autoComplete="postal-code"
            required={true}
            errors={maybe(() => errors!.postalCode)}
            {...basicInputProps()}
          />
        </S.RowWithTwoCells>
        <S.RowWithTwoCells>
          <TextField
            name="country"
            label="Country"
            value={values!.country || ""}
            autoComplete="country"
            required={true}
            errors={maybe(() => errors!.country)}
            {...basicInputProps()}
          />
          <TextField
            name="countryArea"
            label="State/province"
            value={values!.countryArea || ""}
            autoComplete="address-level2"
            required={true}
            errors={maybe(() => errors!.countryArea)}
            {...basicInputProps()}
          />
        </S.RowWithTwoCells>
      </S.Wrapper>
    </S.AddressForm>
  );
};
