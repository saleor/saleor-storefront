import gql from "graphql-tag";

import {
  checkoutFragment,
  checkoutProductVariantFragment,
} from "../fragments/checkout";

export const checkoutDetails = gql`
  ${checkoutFragment}
  query CheckoutDetails(
    $token: UUID!
    $locale:LanguageCodeEnum!
    ) {
    checkout(token: $token) {
      ...Checkout
    }
  }
`;

export const userCheckoutDetails = gql`
  ${checkoutFragment}
  query UserCheckoutDetails(
    $locale:LanguageCodeEnum!
  ) {
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
  query CheckoutProductVariants(
    $ids: [ID]
    $locale:LanguageCodeEnum!
    ) {
    productVariants(ids: $ids, first: 100) {
      edges {
        node {
          stockQuantity
          ...ProductVariant
        }
      }
    }
  }
`;
