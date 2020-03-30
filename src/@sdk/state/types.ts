import { ICheckoutModel } from "../repository";

export enum StateItems {
  CHECKOUT,
  PROMO_CODE,
  SHIPPING_AS_BILLING,
  SELECTED_SHIPPING_ADDRESS_ID,
}

export interface ISaleorState {
  checkout: ICheckoutModel | null;
  promoCode: string | null;
  shippingAsBilling: boolean;
}
