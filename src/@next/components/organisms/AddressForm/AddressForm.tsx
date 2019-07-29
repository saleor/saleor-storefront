import { Formik } from "formik";
import { merge } from "lodash";
import React from "react";

import { AddressFormContent } from "./AddressFormContent";
import { IProps } from "./types";

const INITIAL_VALUES = {
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
      initialValues={merge(INITIAL_VALUES, address)}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ handleChange, handleSubmit, handleBlur, values }) => (
        <AddressFormContent
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleBlur={handleBlur}
          values={values}
          {...props}
        />
      )}
    </Formik>
  );
};
