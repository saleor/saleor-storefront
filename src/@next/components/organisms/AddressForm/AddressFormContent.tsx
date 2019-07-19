import React, { useCallback } from "react";

import { TextField } from "@components/molecules";

import { maybe } from "@utils/tsUtils";
import { FormikTouched } from "formik";
import * as S from "./styles";
import { AddressError, AddressErrors, PropsWithFormik } from "./types";

const REQUIRED = true;

const getInputProps = (
  handleChange: (e: React.ChangeEvent) => void,
  handleBlur: (e: React.FocusEvent) => void
) => (
  name: string,
  label: string,
  errors: AddressErrors | undefined,
  value: string,
  touched: FormikTouched<any> | undefined,
  autocomplete: string,
  required: boolean = false
) => {
  const key = name;
  let addressError: AddressError[] | undefined = maybe(
    () =>
      errors![key as keyof AddressErrors] && [
        errors![key as keyof AddressErrors],
      ],
    []
  );
  if (required && touched![name] && !value) {
    addressError = [
      {
        field: name,
        message: "Required field!",
      },
    ];
  }
  return {
    autocomplete,
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

  return (
    <S.AddressForm ref={formRef} onSubmit={handleSubmit}>
      <S.Wrapper>
        <S.RowWithTwoCells>
          <TextField
            {...basicInputProps(
              "firstName",
              "First Name",
              errors,
              values.firstName,
              touched,
              "given-name",
              REQUIRED
            )}
          />
          <TextField
            {...basicInputProps(
              "lastName",
              "Last Name",
              errors,
              values.lastName,
              touched,
              "family-name"
            )}
          />
        </S.RowWithTwoCells>
        <S.RowWithTwoCells>
          <TextField
            {...basicInputProps(
              "companyName",
              "Company Name (Optional)",
              errors,
              values.companyName,
              touched,
              "organization"
            )}
          />
          <TextField
            {...basicInputProps(
              "phone",
              "Phone",
              errors,
              values.phone,
              touched,
              "tel"
            )}
          />
        </S.RowWithTwoCells>
        <S.RowWithOneCell>
          <TextField
            {...basicInputProps(
              "streetAddress1",
              "Address line 1",
              errors,
              values.streetAddress1,
              touched,
              "address-line1"
            )}
          />
        </S.RowWithOneCell>
        <S.RowWithOneCell>
          <TextField
            {...basicInputProps(
              "streetAddress2",
              "Address line 2",
              errors,
              values.streetAddress2,
              touched,
              "address-line2"
            )}
          />
        </S.RowWithOneCell>
        <S.RowWithTwoCells>
          <TextField
            {...basicInputProps(
              "city",
              "City",
              errors,
              values.city,
              touched,
              "address-level1"
            )}
          />
          <TextField
            {...basicInputProps(
              "postalCode",
              "ZIP Code",
              errors,
              values.postalCode,
              touched,
              "postal-code"
            )}
          />
        </S.RowWithTwoCells>
        <S.RowWithTwoCells>
          <TextField
            {...basicInputProps(
              "country",
              "Country",
              errors,
              values.country,
              touched,
              "country"
            )}
          />
          <TextField
            {...basicInputProps(
              "countryArea",
              "State/province",
              errors,
              values.countryArea,
              touched,
              "address-level2"
            )}
          />
        </S.RowWithTwoCells>
      </S.Wrapper>
    </S.AddressForm>
  );
};
