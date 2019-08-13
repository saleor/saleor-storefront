import { IAddressWithAddressType } from "@types";

declare type Address = {
  id: string;
  onEdit: () => void;
  onRemove: () => void;
  setDefault: () => void;
  address: IAddressWithAddressType;
};
export interface IProps {
  addresses: Address[];
  addNewAddress: () => void;
}
