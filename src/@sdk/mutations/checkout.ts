import gql from "graphql-tag";

import {
  checkoutFragment,
  checkoutLineFragment,
  checkoutPriceFragment
} from "../fragments/checkout";

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

export const createCheckoutMutation = gql`
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

export const updateCheckoutBillingAddressMutation = gql`
  ${checkoutFragment}
  mutation updateCheckoutBillingAddress(
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
