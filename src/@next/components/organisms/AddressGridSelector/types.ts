import { IAddressWithAddressType, IFormError } from "@types";

declare type Address = {
  id: string;
  address: IAddressWithAddressType;
};

export interface IProps {
  addresses: Address[];
  selectedAddressId?: string;
  formId?: string;
  formRef?: React.RefObject<HTMLFormElement>;
  errors?: IFormError[];
  onSelect: (address: IAddressWithAddressType, id: string) => void;
}
