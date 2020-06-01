import { IAddressWithAddressType, IFormError } from "@types";

declare type Address = {
  id: string;
  address: IAddressWithAddressType;
};

export interface IProps {
  addresses: Address[];
  selectedAddressId?: string;
  countriesOptions?: Array<{
    code: string;
    country: string;
  }>;
  userId?: string;
  formId?: string;
  formRef?: React.RefObject<HTMLFormElement>;
  newAddressFormId?: string;
  errors?: IFormError[];
  addNewModalTarget?: HTMLElement | null;
  onSelect: (address?: IAddressWithAddressType, id?: string) => void;
}
