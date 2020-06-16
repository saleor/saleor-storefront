import { IAddress } from ".";

export interface IAddressWithAddressType extends IAddress {
  isDefaultShippingAddress: boolean;
  isDefaultBillingAddress: boolean;
}
