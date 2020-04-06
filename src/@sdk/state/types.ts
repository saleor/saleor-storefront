import {
  ICheckoutModel,
  ICheckoutModelPrice,
  ICheckoutModelPriceValue,
  IPaymentModel,
} from "../repository";

export enum StateItems {
  CHECKOUT,
  SUMMARY_PRICES,
  PROMO_CODE,
  BILLING_AS_SHIPPING,
  SELECTED_SHIPPING_ADDRESS_ID,
  SELECTED_BILLING_ADDRESS_ID,
  PAYMENT,
}

export interface ISaleorStateSummeryPrices {
  shippingPrice?: ICheckoutModelPriceValue;
  subtotalPrice?: ICheckoutModelPrice;
  totalPrice?: ICheckoutModelPrice;
}

export interface ISaleorState {
  checkout?: ICheckoutModel;
  promoCode?: string;
  selectedShippingAddressId?: string;
  selectedBillingAddressId?: string;
  summaryPrices?: ISaleorStateSummeryPrices;
  payment?: IPaymentModel;
}
