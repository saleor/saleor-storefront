import { Formik } from "formik";
import React from "react";

// import { IAddress } from "@types";

import { AddressFormContent } from "./AddressFormContent";
import { IProps } from "./types";

export const AddressForm: React.FC<IProps> = ({
  handleSubmit,
  address,
  ...props
}: IProps) => {
  return (
    <Formik
      initialValues={address}
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
