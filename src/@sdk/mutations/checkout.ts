import gql from "graphql-tag";

import {
  checkoutFragment,
  checkoutLineFragment,
  checkoutPriceFragment,
} from "../fragments/checkout";

export const updateCheckoutLineQuery = gql`
  ${checkoutLineFragment}
  ${checkoutPriceFragment}
  mutation UpdateCheckoutLine($checkoutId: ID!, $lines: [CheckoutLineInput]!) {
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

export const createCheckoutMutation = gql`
  ${checkoutFragment}
  mutation CreateCheckout($checkoutInput: CheckoutCreateInput!) {
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

export const updateCheckoutBillingAddressMutation = gql`
  ${checkoutFragment}
  mutation UpdateCheckoutBillingAddress(
    $checkoutId: ID!
    $billingAddress: AddressInput!
  ) {
    checkoutBillingAddressUpdate(
      checkoutId: $checkoutId
      billingAddress: $billingAddress
    ) {
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

export const updateCheckoutShippingAddressMutation = gql`
  ${checkoutFragment}
  mutation UpdateCheckoutShippingAddress(
    $checkoutId: ID!
    $shippingAddress: AddressInput!
    $email: String!
  ) {
    checkoutShippingAddressUpdate(
      checkoutId: $checkoutId
      shippingAddress: $shippingAddress
    ) {
      errors {
        field
        message
      }
      checkout {
        ...Checkout
      }
    }
    checkoutEmailUpdate(checkoutId: $checkoutId, email: $email) {
      checkout {
        ...Checkout
      }
      errors {
        field
        message
      }
    }
  }
`;

export const addCheckoutPromoCode = gql`
  ${checkoutFragment}
  mutation AddCheckoutPromoCode($checkoutId: ID!, $promoCode: String!) {
    checkoutAddPromoCode(checkoutId: $checkoutId, promoCode: $promoCode) {
      checkout {
        ...Checkout
      }
      errors {
        field
        message
      }
      checkoutErrors {
        field
        message
        code
      }
    }
  }
`;

export const removeCheckoutPromoCode = gql`
  ${checkoutFragment}
  mutation RemoveCheckoutPromoCode($checkoutId: ID!, $promoCode: String!) {
    checkoutRemovePromoCode(checkoutId: $checkoutId, promoCode: $promoCode) {
      checkout {
        ...Checkout
      }
      errors {
        field
        message
      }
      checkoutErrors {
        field
        message
        code
      }
    }
  }
`;
