import { IAddress } from "@types";

export interface IFormikProps {
  handleChange?: (e: React.ChangeEvent) => void;
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  handleBlur?: (e: React.FocusEvent) => void;
  setFieldValue: (field: string, value: string) => void;
  values?: IAddress;
  options?: Array<{
    code: string;
    country: string;
  }>;
}

export type AddressError = { field?: string; message: string };

export interface IProps {
  address?: IAddress;
  defaultValue?: any;
  formId?: string;
  formRef?: React.RefObject<HTMLFormElement>;
  errors?: any;
  handleSubmit?: (formData: IAddress | undefined) => void;
  handleChange?: (e: React.ChangeEvent) => void;
  handleBlur?: (e: React.FocusEvent) => void;
}

export type PropsWithFormik = Omit<IProps, "handleSubmit"> & IFormikProps;
