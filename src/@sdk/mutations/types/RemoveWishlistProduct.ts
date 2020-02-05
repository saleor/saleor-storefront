/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { WishlistErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: RemoveWishlistProduct
// ====================================================

export interface RemoveWishlistProduct_wishlistRemoveProduct_wishlist_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface RemoveWishlistProduct_wishlistRemoveProduct_wishlist {
  __typename: "WishlistItem";
  /**
   * The ID of the object.
   */
  id: string;
  product: RemoveWishlistProduct_wishlistRemoveProduct_wishlist_product;
}

export interface RemoveWishlistProduct_wishlistRemoveProduct_errors {
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

export interface RemoveWishlistProduct_wishlistRemoveProduct_wishlistErrors {
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

export interface RemoveWishlistProduct_wishlistRemoveProduct {
  __typename: "WishlistRemoveProductMutation";
  /**
   * The wishlist of the current user.
   */
  wishlist: (RemoveWishlistProduct_wishlistRemoveProduct_wishlist | null)[] | null;
  /**
   * List of errors that occurred executing the mutation.
   */
  errors: RemoveWishlistProduct_wishlistRemoveProduct_errors[] | null;
  wishlistErrors: RemoveWishlistProduct_wishlistRemoveProduct_wishlistErrors[] | null;
}

export interface RemoveWishlistProduct {
  /**
   * Remove product from the current user's wishlist.
   */
  wishlistRemoveProduct: RemoveWishlistProduct_wishlistRemoveProduct | null;
}

export interface RemoveWishlistProductVariables {
  productId: string;
}
