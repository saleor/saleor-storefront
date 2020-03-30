import { UserDetails_me } from "@sdk/queries/types/UserDetails";
import { IAddressWithAddressType } from "@types";

export interface IProps {
  userAddresses: UserDetails_me["addresses"] | null | undefined;
  selectedUserAddressId?: string;
  billingAsShippingAddress?: boolean;
  setBillingAddress: (id: string, address: IAddressWithAddressType) => void;
  setBillingAsShippingAddress: (billingAsShippingAddress: boolean) => void;
}
