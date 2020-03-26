import { IAddressWithAddressType } from "@types";

export interface IProps {
  id: string;
  onSelect: () => void;
  selected: boolean;
  address: IAddressWithAddressType;
  inputName: string;
  label: string;
}
