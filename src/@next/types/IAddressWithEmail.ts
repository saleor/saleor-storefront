import { IAddress } from ".";

export interface IAddressWithEmail extends IAddress {
  email?: string;
}
