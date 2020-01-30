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

export interface WishlistItem_variants_edges_node {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface WishlistItem_variants_edges {
  __typename: "ProductVariantCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: WishlistItem_variants_edges_node;
}

export interface WishlistItem_variants {
  __typename: "ProductVariantCountableConnection";
  edges: WishlistItem_variants_edges[];
}

export interface WishlistItem {
  __typename: "WishlistItem";
  /**
   * The ID of the object.
   */
  id: string;
  product: WishlistItem_product;
  variants: WishlistItem_variants;
}
