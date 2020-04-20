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
  PAYMENT,
}

export interface ISaleorStateSummeryPrices {
  shippingPrice?: ICheckoutModelPriceValue;
  subtotalPrice?: ICheckoutModelPrice;
  totalPrice?: ICheckoutModelPrice;
  discount?: ICheckoutModelPriceValue;
}

export interface ISaleorState {
  checkout?: ICheckoutModel;
  selectedShippingAddressId?: string;
  selectedBillingAddressId?: string;
  summaryPrices?: ISaleorStateSummeryPrices;
  payment?: IPaymentModel;
}
