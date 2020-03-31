import {
  Checkout_availableShippingMethods,
  Checkout_lines_totalPrice_gross,
  Checkout_lines_totalPrice_net,
  Checkout_lines_variant_attributes,
  Checkout_lines_variant_pricing,
  Checkout_lines_variant_product,
  Checkout_shippingAddress,
  Checkout_shippingPrice,
  Checkout_subtotalPrice,
  Checkout_totalPrice,
} from "../fragments/types/Checkout";

export enum LocalStorageItems {
  JOB_QUEUE_CHECKOUT = "job_queueCheckout",
  CHECKOUT = "data_checkout",
  CHECKOUT_TOKEN = "data_checkoutToken",
}

export interface ICheckoutModelLineTotalPrice {
  gross: Checkout_lines_totalPrice_gross;
  net: Checkout_lines_totalPrice_net;
}

export interface ICheckoutModelLineVariant {
  stockQuantity: number | undefined;
  id: string;
  name: string | undefined;
  sku: string | undefined;
  pricing: Checkout_lines_variant_pricing | null | undefined;
  product: Checkout_lines_variant_product | undefined;
  isAvailable: boolean | null | undefined;
  attributes: Checkout_lines_variant_attributes[] | undefined;
}

export interface ICheckoutModelLine {
  quantity: number;
  id: string | undefined;
  variant: ICheckoutModelLineVariant;
  totalPrice: ICheckoutModelLineTotalPrice | null | undefined;
}

export interface ICheckoutAddress {
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

export interface ICheckoutModel {
  id: string | undefined;
  email: string | undefined;
  shippingAddress: ICheckoutAddress | null | undefined;
  billingAddress: ICheckoutAddress | null | undefined;
  lines: ICheckoutModelLine[] | null | undefined;
  totalPrice: Checkout_totalPrice | null | undefined;
  subtotalPrice: Checkout_subtotalPrice | null | undefined;
  shippingPrice: Checkout_shippingPrice | null | undefined;
  availableShippingMethods?: Checkout_availableShippingMethods[];
}

export interface IJobsModel {
  cart: {
    setCartItem?: boolean;
  };
  checkout: {
    setShippingAddress?: boolean;
  };
}

export interface ILocalRepository {
  getCheckout(): ICheckoutModel | null;
  setCheckout(checkout: ICheckoutModel | null): void;
  getCheckoutToken(): string | null;
  setCheckoutToken(token: string): void;
}
