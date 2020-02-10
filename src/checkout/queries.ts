import gql from "graphql-tag";

import { TypedMutation } from "../core/mutations";
import { TypedQuery } from "../core/queries";
import {
  createCheckout,
  createCheckoutVariables,
} from "./types/createCheckout";
import { getCheckout, getCheckoutVariables } from "./types/getCheckout";
import { getUserCheckout } from "./types/getUserCheckout";
import {
  getVariantsProducts,
  getVariantsProductsVariables,
} from "./types/getVariantsProducts";

export const checkoutAddressFragment = gql`
  fragment Address on Address {
    id
    firstName
    lastName
    companyName
    streetAddress1
    streetAddress2
    city
    postalCode
    country {
      code
      country
    }
    countryArea
    phone
  }
`;

const checkoutPriceFragment = gql`
  fragment Price on TaxedMoney {
    gross {
      amount
      currency
    }
    net {
      amount
      currency
    }
  }
`;

export const checkoutProductVariantFragment = gql`
  ${checkoutPriceFragment}
  fragment ProductVariant on ProductVariant {
    id
    name
    pricing {
      onSale
      priceUndiscounted {
        ...Price
      }
      price {
        ...Price
      }
    }
    product {
      id
      name
      thumbnail {
        url
        alt
      }
      thumbnail2x: thumbnail(size: 510) {
        url
      }
    }
  }
`;

const checkoutShippingMethodFragment = gql`
  fragment ShippingMethod on ShippingMethod {
    id
    name
    price {
      currency
      amount
    }
  }
`;

const checkoutLineFragment = gql`
  ${checkoutPriceFragment}
  ${checkoutProductVariantFragment}
  fragment CheckoutLine on CheckoutLine {
    id
    quantity
    totalPrice {
      ...Price
    }
    variant {
      stockQuantity
      ...ProductVariant
    }
  }
`;

export const checkoutFragment = gql`
  ${checkoutLineFragment}
  ${checkoutAddressFragment}
  ${checkoutPriceFragment}
  ${checkoutShippingMethodFragment}
  fragment Checkout on Checkout {
    availablePaymentGateways {
      name
      config {
        field
        value
      }
    }
    token
    id
    totalPrice {
      ...Price
    }
    subtotalPrice {
      ...Price
    }
    billingAddress {
      ...Address
    }
    shippingAddress {
      ...Address
    }
    email
    availableShippingMethods {
      ...ShippingMethod
    }
    shippingMethod {
      ...ShippingMethod
    }
    shippingPrice {
      ...Price
    }
    lines {
      ...CheckoutLine
    }
    isShippingRequired
    discount {
      currency
      amount
    }
    discountName
    translatedDiscountName
    voucherCode
  }
`;

export const getCheckoutQuery = gql`
  ${checkoutFragment}
  query getCheckout($token: UUID!) {
    checkout(token: $token) {
      ...Checkout
    }
  }
`;

export const TypedGetCheckoutQuery = TypedQuery<
  getCheckout,
  getCheckoutVariables
>(getCheckoutQuery);

export const updateCheckoutLineQuery = gql`
  ${checkoutLineFragment}
  ${checkoutPriceFragment}
  mutation updateCheckoutLine($checkoutId: ID!, $lines: [CheckoutLineInput]!) {
    checkoutLinesUpdate(checkoutId: $checkoutId, lines: $lines) {
      checkout {
        id
        lines {
          ...CheckoutLine
        }
        totalPrice {
          ...Price
        }
        subtotalPrice {
          ...Price
        }
        isShippingRequired
      }
      errors {
        field
        message
      }
    }
  }
`;

const createCheckoutMutation = gql`
  ${checkoutFragment}
  mutation createCheckout($checkoutInput: CheckoutCreateInput!) {
    checkoutCreate(input: $checkoutInput) {
      errors {
        field
        message
      }
      checkout {
        ...Checkout
      }
    }
  }
`;

export const TypedCreateCheckoutMutation = TypedMutation<
  createCheckout,
  createCheckoutVariables
>(createCheckoutMutation);

const getUserCheckoutQuery = gql`
  ${checkoutFragment}
  query getUserCheckout {
    me {
      checkout {
        ...Checkout
      }
    }
  }
`;

export const TypedGetUserCheckoutQuery = TypedQuery<getUserCheckout, {}>(
  getUserCheckoutQuery
);

export const getVariantsProductsQuery = gql`
  query getVariantsProducts($ids: [ID]) {
    productVariants(ids: $ids, first: 100) {
      edges {
        node {
          id
          product {
            id
            productType {
              isShippingRequired
            }
          }
        }
      }
    }
  }
`;

export const TypedGetVariantsProductsQuery = TypedQuery<
  getVariantsProducts,
  getVariantsProductsVariables
>(getVariantsProductsQuery);
