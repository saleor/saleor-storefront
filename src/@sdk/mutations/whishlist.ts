import gql from "graphql-tag";

import { wishlistItemFragment } from "../fragments/wishlist";

export const addWhishlistProduct = gql`
  ${wishlistItemFragment}
  mutation AddWishlistProduct($productId: ID!) {
    wishlistAddProduct(productId: $productId) {
      wishlist {
        ...WishlistItem
      }
      errors {
        field
        message
      }
      wishlistErrors {
        field
        message
        code
      }
    }
  }
`;

export const removeWhishlistProduct = gql`
  ${wishlistItemFragment}
  mutation RemoveWishlistProduct($productId: ID!) {
    wishlistRemoveProduct(productId: $productId) {
      wishlist {
        ...WishlistItem
      }
      errors {
        field
        message
      }
      wishlistErrors {
        field
        message
        code
      }
    }
  }
`;

export const addWhishlistProductVariant = gql`
  ${wishlistItemFragment}
  mutation AddWishlistProductVariant($variantId: ID!) {
    wishlistAddVariant(variantId: $variantId) {
      wishlist {
        ...WishlistItem
      }
      errors {
        field
        message
      }
      wishlistErrors {
        field
        message
        code
      }
    }
  }
`;

export const removeWhishlistProductVariant = gql`
  ${wishlistItemFragment}
  mutation RemoveWishlistProductVariant($variantId: ID!) {
    wishlistRemoveVariant(variantId: $variantId) {
      wishlist {
        ...WishlistItem
      }
      errors {
        field
        message
      }
      wishlistErrors {
        field
        message
        code
      }
    }
  }
`;
