import {
  Checkout_availablePaymentGateways,
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
  gross: ICheckoutModelPriceValue;
  net: ICheckoutModelPriceValue;
}

export interface ICheckoutModelLineVariant {
  stockQuantity?: number;
  id: string;
  name?: string;
  sku?: string;
  pricing?: Checkout_lines_variant_pricing | null;
  product?: Checkout_lines_variant_product;
  isAvailable?: boolean | null;
  attributes?: Checkout_lines_variant_attributes[];
}

export interface ICheckoutModelLine {
  quantity: number;
  id?: string;
  variant: ICheckoutModelLineVariant;
  totalPrice?: ICheckoutModelLineTotalPrice | null;
}

export interface ICheckoutModelPriceValue {
  amount: number;
  currency?: string;
}

export interface ICheckoutModelPrice {
  gross: ICheckoutModelPriceValue;
  net: ICheckoutModelPriceValue;
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
  id?: string;
  token?: any;
  email?: string;
  shippingAddress?: ICheckoutAddress | null;
  billingAddress?: ICheckoutAddress | null;
  lines?: ICheckoutModelLine[] | null;
  totalPrice?: ICheckoutModelPrice | null;
  subtotalPrice?: ICheckoutModelPrice | null;
  shippingPrice?: ICheckoutModelPrice | null;
  availableShippingMethods?: Checkout_availableShippingMethods[];
  availablePaymentGateways?: Checkout_availablePaymentGateways[];
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
