import { UserDetails_me } from "@sdk/queries/types/UserDetails";
import { getShop_shop_countries } from "@temp/core/types/saleor";
import { IAddress } from "@types";

export interface IPaymentGatewayConfig {
  /**
   * Gateway config key.
   */
  field: string;
  /**
   * Gateway config value for key.
   */
  value: string | null;
}

export interface IPaymentGateway {
  /**
   * Payment gateway name.
   */
  name: string;
  /**
   * Payment gateway client configuration.
   */
  config: IPaymentGatewayConfig[];
}

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
