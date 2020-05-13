import { GetShop_shop_countries } from "@temp/@sdk/queries/gqlTypes/GetShop";
import { IAddress, IAddressWithAddressType, IFormError } from "@types";

export declare type Address = {
  id: string;
  address: IAddressWithAddressType;
};

export interface IProps {
  userAddresses?: Address[] | null;
  selectedUserAddressId?: string;
  checkoutAddress?: IAddress | null;
  email?: string;
  countries?: Array<GetShop_shop_countries | null>;
  userId?: string;
  formRef?: React.RefObject<HTMLFormElement>;
  formId?: string;
  newAddressFormId?: string;
  errors?: IFormError[];
  setShippingAddress: (address?: IAddress, email?: string, id?: string) => void;
}
