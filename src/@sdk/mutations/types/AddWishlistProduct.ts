/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { WishlistErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: AddWishlistProduct
// ====================================================

export interface AddWishlistProduct_wishlistAddProduct_wishlist_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface AddWishlistProduct_wishlistAddProduct_wishlist {
  __typename: "WishlistItem";
  /**
   * The ID of the object.
   */
  id: string;
  product: AddWishlistProduct_wishlistAddProduct_wishlist_product;
}

export interface AddWishlistProduct_wishlistAddProduct_errors {
  __typename: "Error";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
}

export interface AddWishlistProduct_wishlistAddProduct_wishlistErrors {
  __typename: "WishlistError";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
  /**
   * The error code.
   */
  code: WishlistErrorCode | null;
}

export interface AddWishlistProduct_wishlistAddProduct {
  __typename: "WishlistAddProductMutation";
  /**
   * The wishlist of the current user.
   */
  wishlist: (AddWishlistProduct_wishlistAddProduct_wishlist | null)[] | null;
  /**
   * List of errors that occurred executing the mutation.
   */
  errors: AddWishlistProduct_wishlistAddProduct_errors[] | null;
  wishlistErrors: AddWishlistProduct_wishlistAddProduct_wishlistErrors[] | null;
}

export interface AddWishlistProduct {
  /**
   * Add product to the current user's wishlist.
   */
  wishlistAddProduct: AddWishlistProduct_wishlistAddProduct | null;
}

export interface AddWishlistProductVariables {
  productId: string;
}
