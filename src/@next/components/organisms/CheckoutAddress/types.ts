import { UserDetails_me } from "@sdk/queries/types/UserDetails";
import { getShop_shop_countries } from "@temp/core/types/saleor";
import { IAddress } from "@types";

export interface IProps {
  userAddresses: UserDetails_me["addresses"] | null | undefined;
  selectedUserAddressId?: string;
  checkoutAddress: IAddress | null | undefined;
  countries: Array<getShop_shop_countries | null>;
  formRef: React.RefObject<HTMLFormElement>;
  formId: string;
  setShippingAddress: (address: IAddress, id?: string) => void;
}
