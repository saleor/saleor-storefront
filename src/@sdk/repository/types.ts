import {
  Checkout_availablePaymentGateways,
  Checkout_availableShippingMethods,
  Checkout_lines_variant_attributes,
  Checkout_lines_variant_pricing,
  Checkout_lines_variant_product,
} from "../fragments/types/Checkout";
import { Payment_creditCard } from "../fragments/types/Payment";

export enum LocalStorageItems {
  JOB_QUEUE_CHECKOUT = "job_queueCheckout",
  CHECKOUT = "data_checkout",
  PAYMENT = "data_payment",
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
  currency: string;
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

export interface ICheckoutModelShippingMethod {
  id: string;
  name: string;
  price: ICheckoutModelPriceValue | null;
}

export interface ICheckoutModelPromoCodeDiscount {
  voucherCode?: string | null;
  discount?: ICheckoutModelPriceValue | null;
  discountName?: string | null;
}

export interface ICheckoutModel {
  id?: string;
  token?: any;
  email?: string;
  shippingAddress?: ICheckoutAddress | null;
  billingAddress?: ICheckoutAddress | null;
  billingAsShipping?: boolean;
  promoCodeDiscount?: ICheckoutModelPromoCodeDiscount;
  lines?: ICheckoutModelLine[] | null;
  availableShippingMethods?: Checkout_availableShippingMethods[];
  shippingMethod?: ICheckoutModelShippingMethod | null;
  availablePaymentGateways?: Checkout_availablePaymentGateways[];
}

export interface IPaymentModel {
  id?: string;
  token?: string;
  gateway?: string;
  creditCard?: Payment_creditCard | null;
}

export interface IOrderModel {
  id?: string;
  token?: string;
  number?: string | null;
}

export interface IJobsModel {
  cart: {
    setCartItem?: boolean;
  };
  checkout: {
    setShippingAddress?: boolean;
    setBillingAddress?: boolean;
    setShippingMethod?: boolean;
    setPromoCode?: boolean;
  };
}

export interface ILocalRepository {
  getCheckout(): ICheckoutModel | null;
  setCheckout(checkout: ICheckoutModel | null): void;
  getPayment(): IPaymentModel | null;
  setPayment(payment: IPaymentModel | null): void;
}
