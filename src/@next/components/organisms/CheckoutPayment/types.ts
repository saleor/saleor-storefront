import { GetShop_shop_countries } from "@sdk/queries/gqlTypes/GetShop";
import {
  IAddress,
  IAddressWithAddressType,
  ICardData,
  IFormError,
  IPaymentGateway,
} from "@types";

export interface IPromoCodeDiscount {
  voucherCode?: string | null;
}

export interface IProps {
  billingErrors?: IFormError[];
  gatewayErrors?: IFormError[];
  promoCodeErrors?: IFormError[];
  userAddresses?: IAddressWithAddressType[] | null;
  selectedUserAddressId?: string;
  billingAsShippingAddress?: boolean;
  checkoutBillingAddress?: IAddress | null | undefined;
  countries: Array<GetShop_shop_countries | null>;
  billingFormRef?: React.RefObject<HTMLFormElement>;
  billingFormId?: string;
  paymentGateways: IPaymentGateway[];
  setBillingAddress: (address?: IAddress, email?: string, id?: string) => void;
  billingAsShippingPossible: boolean;
  setBillingAsShippingAddress: (billingAsShippingAddress: boolean) => void;
  promoCodeDiscount?: IPromoCodeDiscount;
  promoCodeDiscountFormRef?: React.RefObject<HTMLFormElement>;
  promoCodeDiscountFormId?: string;
  addPromoCode: (promoCode: string) => void;
  removeVoucherCode: (voucherCode: string) => void;
  submitUnchangedDiscount: () => void;
  /**
   * Selected payment gateway.
   */
  selectedPaymentGateway?: string;
  /**
   * Selected payment gateway token.
   */
  selectedPaymentGatewayToken?: string;
  /**
   * Called when selected payment gateway is changed.
   */
  selectPaymentGateway: (paymentGateway: string) => void;
  /**
   * Gateway form reference on which payment might be submitted.
   */
  gatewayFormRef?: React.RefObject<HTMLFormElement>;
  gatewayFormId?: string;
  newAddressFormId?: string;
  userId?: string;
  /**
   * Method called after the form is submitted. Passed gateway id and token attribute will be used to create payment.
   */
  processPayment: (
    gateway: string,
    token: string,
    cardData?: ICardData
  ) => void;
  /**
   * Method called when gateway error occured.
   */
  onGatewayError: (errors: IFormError[]) => void;
}
