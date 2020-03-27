import { UserDetails_me } from "@sdk/queries/types/UserDetails";
import { IAddress, IAddressWithAddressType } from "@types";

export interface IProps {
  userAddresses: UserDetails_me["addresses"] | null | undefined;
  checkoutAddress: IAddress | null | undefined;
  setShippingAddress: (id: string, address: IAddressWithAddressType) => void;
}
