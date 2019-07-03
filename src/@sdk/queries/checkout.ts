import gql from "graphql-tag";

import { checkoutFragment } from "../fragments/checkout";

export const getCheckoutQuery = gql`
  ${checkoutFragment}
  query getCheckout($token: UUID!) {
    checkout(token: $token) {
      ...Checkout
    }
  }
`;

export const getUserCheckoutQuery = gql`
  ${checkoutFragment}
  query getUserCheckout {
    me {
      checkout {
        ...Checkout
      }
    }
  }
`;
