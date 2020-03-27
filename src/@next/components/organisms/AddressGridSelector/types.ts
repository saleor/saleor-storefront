import { IAddressWithAddressType } from "@types";

declare type Address = {
  id: string;
  address: IAddressWithAddressType;
};

export interface IProps {
  addresses: Address[];
  selectedAddressId?: string;
  onSelect: (id: string, address: IAddressWithAddressType) => void;
}
