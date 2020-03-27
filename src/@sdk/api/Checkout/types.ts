import { PromiseResponse } from "../types";

export interface IAddress {
  id?: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  streetAddress1?: string;
  streetAddress2?: string;
  city?: string;
  postalCode?: string;
  countryArea?: string;
  phone?: string | null;
  country?: {
    code?: string;
    country?: string;
  };
}

export interface ICheckout {
  id: string | undefined;
  email: string | undefined;
  shippingAddress: IAddress | null | undefined;
  billingAddress: object | null | undefined;
}

export interface ISaleorCheckoutAPI {
  checkout: ICheckout | null;
  promoCode: string | null;
  shippingAsBilling: boolean;
  load: () => PromiseResponse;
  setBillingAddress: () => PromiseResponse;
  setShippingAddress: (shippingAddress: IAddress) => PromiseResponse;
  setShippingAsBillingAddress: () => PromiseResponse;
  makeOrder: () => PromiseResponse;
}
