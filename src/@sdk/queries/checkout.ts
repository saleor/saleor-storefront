import gql from "graphql-tag";

import {
  checkoutFragment,
  checkoutProductVariantFragment,
} from "../fragments/checkout";

export const checkoutDetails = gql`
  ${checkoutFragment}
  query CheckoutDetails($token: UUID!) {
    checkout(token: $token) {
      ...Checkout
    }
  }
`;

export const userCheckoutDetails = gql`
  ${checkoutFragment}
  query UserCheckoutDetails {
    me {
      id
      checkout {
        ...Checkout
      }
    }
  }
`;

export const checkoutProductVariants = gql`
  ${checkoutProductVariantFragment}
  query CheckoutProductVariants($ids: [ID], $countryCode: CountryCode) {
    productVariants(ids: $ids, first: 100) {
      edges {
        node {
          quantityAvailable(countryCode: $countryCode)
          ...ProductVariant
        }
      }
    }
  }
`;
