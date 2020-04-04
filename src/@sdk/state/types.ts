import { ICheckoutModel, IPaymentModel } from "../repository";

export enum StateItems {
  CHECKOUT,
  PROMO_CODE,
  BILLING_AS_SHIPPING,
  SELECTED_SHIPPING_ADDRESS_ID,
  SELECTED_BILLING_ADDRESS_ID,
  PAYMENT,
}

export interface ISaleorState {
  checkout?: ICheckoutModel;
  promoCode?: string;
  selectedShippingAddressId?: string;
  selectedBillingAddressId?: string;
  payment?: IPaymentModel;
}
