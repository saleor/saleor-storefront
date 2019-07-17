import { Formik } from "formik";
import { merge } from "lodash";
import React from "react";

import { TextField } from "@components/molecules";
import { maybe } from "@utils/tsUtils";
import * as S from "./styles";

import { AddressFormContent } from "./AddressFormContent";
import { IProps } from "./types";

const INITIAL_ADDRESS_VALUES_STATE = {
  city: "",
  companyName: "",
  country: "",
  countryArea: "",
  firstName: "",
  lastName: "",
  phone: "",
  postalCode: "",
  streetAddress1: "",
  streetAddress2: "",
};

export const AddressForm: React.FC<IProps> = ({
  handleSubmit,
  address,
  ...props
}: IProps) => {
  return (
    <Formik
      initialValues={merge(INITIAL_ADDRESS_VALUES_STATE, address)}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ handleChange, handleSubmit, handleBlur, values, touched }) => (
        <AddressFormContent
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleBlur={handleBlur}
          values={values}
          touched={touched}
          {...props}
        />
      )}
    </Formik>
  );
};
