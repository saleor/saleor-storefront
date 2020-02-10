/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: WishlistItem
// ====================================================

export interface WishlistItem_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface WishlistItem {
  __typename: "WishlistItem";
  /**
   * The ID of the object.
   */
  id: string;
  product: WishlistItem_product;
}
