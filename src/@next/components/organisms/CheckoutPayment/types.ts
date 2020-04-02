import { UserDetails_me } from "@sdk/queries/types/UserDetails";
import { getShop_shop_countries } from "@temp/core/types/saleor";
import { IAddress, IPaymentGateway } from "@types";

export interface IProps {
  userAddresses: UserDetails_me["addresses"] | null | undefined;
  selectedUserAddressId?: string;
  billingAsShippingAddress?: boolean;
  checkoutBillingAddress: IAddress | null | undefined;
  countries: Array<getShop_shop_countries | null>;
  formRef: React.RefObject<HTMLFormElement>;
  formId: string;
  paymentGateways: IPaymentGateway[];
  setBillingAddress: (address: IAddress, id?: string) => void;
  setBillingAsShippingAddress: (billingAsShippingAddress: boolean) => void;
}
