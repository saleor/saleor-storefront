import { Price } from "./types/Price";
import gql from "graphql-tag";

import { TypedMutation } from "../core/mutations";
import { TypedQuery } from "../core/queries";
import {
  createCheckout,
  createCheckoutVariables
} from "./types/createCheckout";
import { getCheckout, getCheckoutVariables } from "./types/getCheckout";
import { getUserCheckout } from "./types/getUserCheckout";

const checkoutAddressFragment = gql`
  fragment Address on Address {
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
      localized
    }
    currency
  }
`;

const checkoutShippingMethodFragment = gql`
  fragment ShippingMethod on ShippingMethod {
    id
    name
    price {
      currency
      amount
      localized
    }
  }
`;

const checkoutLineFragment = gql`
  ${checkoutPriceFragment}
  fragment CheckoutLine on CheckoutLine {
    id
    quantity
    totalPrice {
      ...Price
    }
    variant {
      id
      name
      price {
        amount
        currency
        localized
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
    quantity
  }
`;

export const checkoutFragment = gql`
  ${checkoutLineFragment}
  ${checkoutAddressFragment}
  ${checkoutPriceFragment}
  ${checkoutShippingMethodFragment}
  fragment Checkout on Checkout {
    token
    id
    user {
      email
    }
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
        subtotalPrice {
          ...Price
        }
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
