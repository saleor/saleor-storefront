import { IAddressWithAddressType } from "@types";

export interface IProps {
  id: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  address: IAddressWithAddressType;
  inputName: string;
}
