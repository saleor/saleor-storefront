import { IAddress } from "@types";

export interface IFormikProps {
  handleChange: (e: React.ChangeEvent) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleBlur: (e: React.FocusEvent) => void;
  values: Partial<IAddress>;
}

export type AddressError = { field?: string; message: string };

export type AddressErrors = {
  firstName?: AddressError[];
  lastName?: AddressError[];
  companyName?: AddressError[];
  streetAddress1?: AddressError[];
  streetAddress2?: AddressError[];
  city?: AddressError[];
  postalCode?: AddressError[];
  countryArea?: AddressError[];
  phone?: AddressError[];
  country?: AddressError[];
};

export interface IProps {
  address?: Partial<IAddress>;
  formRef?: React.RefObject<HTMLFormElement>;
  errors?: AddressErrors;
  handleSubmit: (formData: IAddress) => void;
  handleChange?: (e: React.ChangeEvent) => void;
  handleBlur?: (e: React.FocusEvent) => void;
}

export type PropsWithFormik = Omit<IProps, "handleSubmit"> & IFormikProps;
