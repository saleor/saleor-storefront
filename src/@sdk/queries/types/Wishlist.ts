/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Wishlist
// ====================================================

export interface Wishlist_me_wishlist_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
}

export interface Wishlist_me_wishlist_edges_node_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface Wishlist_me_wishlist_edges_node_variants_edges_node {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface Wishlist_me_wishlist_edges_node_variants_edges {
  __typename: "ProductVariantCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: Wishlist_me_wishlist_edges_node_variants_edges_node;
}

export interface Wishlist_me_wishlist_edges_node_variants {
  __typename: "ProductVariantCountableConnection";
  edges: Wishlist_me_wishlist_edges_node_variants_edges[];
}

export interface Wishlist_me_wishlist_edges_node {
  __typename: "WishlistItem";
  /**
   * The ID of the object.
   */
  id: string;
  product: Wishlist_me_wishlist_edges_node_product;
  variants: Wishlist_me_wishlist_edges_node_variants;
}

export interface Wishlist_me_wishlist_edges {
  __typename: "WishlistItemCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: Wishlist_me_wishlist_edges_node;
}

export interface Wishlist_me_wishlist {
  __typename: "WishlistItemCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: Wishlist_me_wishlist_pageInfo;
  edges: Wishlist_me_wishlist_edges[];
}

export interface Wishlist_me {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * User's wishlist.
   */
  wishlist: Wishlist_me_wishlist | null;
}

export interface Wishlist {
  /**
   * Return the currently authenticated user.
   */
  me: Wishlist_me | null;
}

export interface WishlistVariables {
  after?: string | null;
  first?: number | null;
}
