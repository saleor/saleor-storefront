import { Formik } from "formik";
import { merge } from "lodash";
import React from "react";

import { IAddress } from "@types";

import { AddressFormContent } from "./AddressFormContent";
import { IProps } from "./types";

const INITIAL_ADDRESS_VALUES_STATE: IAddress = {
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
