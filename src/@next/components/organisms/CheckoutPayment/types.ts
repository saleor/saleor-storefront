import { UserDetails_me } from "@sdk/queries/types/UserDetails";
import { IAddress } from "@types";

export interface IProps {
  userAddresses: UserDetails_me["addresses"] | null | undefined;
  selectedUserAddressId?: string;
  billingAsShippingAddress?: boolean;
  setBillingAddress: (address: IAddress, id: string) => void;
  setBillingAsShippingAddress: (billingAsShippingAddress: boolean) => void;
}
