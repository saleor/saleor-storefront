import React from "react";

import { Formik } from "formik";
import { merge } from "lodash";

import * as S from "./styles";
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
    <S.Wrapper>
      <Formik
        initialValues={merge(INITIAL_ADDRESS_VALUES_STATE, address)}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);
          setSubmitting(false);
        }}
      ></Formik>
    </S.Wrapper>
  );
};
