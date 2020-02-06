import gql from "graphql-tag";

export const addWhishlistProduct = gql`
  mutation AddWishlistProduct($productId: ID!) {
    wishlistAddProduct(productId: $productId) {
      wishlist {
        id
        product {
          id
          name
        }
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
  mutation RemoveWishlistProduct($productId: ID!) {
    wishlistRemoveProduct(productId: $productId) {
      wishlist {
        id
        product {
          id
          name
        }
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
  mutation AddWishlistProductVariant($variantId: ID!) {
    wishlistAddVariant(variantId: $variantId) {
      wishlist {
        id
        product {
          id
          name
        }
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
  mutation RemoveWishlistProductVariant($variantId: ID!) {
    wishlistRemoveVariant(variantId: $variantId) {
      wishlist {
        id
        product {
          id
          name
        }
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
