import { IAddressWithAddressType } from "@types";

declare type Address = {
  id: string;
  onSelect: () => void;
  address: IAddressWithAddressType;
};

export interface IProps {
  addresses: Address[];
  onSelect: () => void;
}
