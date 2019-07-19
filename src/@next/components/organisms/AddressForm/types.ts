import { FormikTouched } from "formik";

import { IAddress } from "@types";

export interface IFormikProps {
  handleChange: (e: React.ChangeEvent) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleBlur: (e: React.FocusEvent) => void;
  values: Partial<IAddress>;
}

export type AddressError = { field?: string; message: string };

export type AddressErrors = {
  firstName: AddressError;
};

export interface IProps {
  address?: Partial<IAddress>;
  formRef?: React.RefObject<HTMLFormElement>;
  errors?: AddressErrors;
  handleSubmit: (formData: IAddress) => void;
  handleChange?: () => void;
  handleBlur?: () => void;
  touched?: FormikTouched<any> | undefined;
}

export type PropsWithFormik = Exclude<IProps, "handleSubmit"> & IFormikProps;
