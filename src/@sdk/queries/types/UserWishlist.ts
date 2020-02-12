/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserWishlist
// ====================================================

export interface UserWishlist_me_wishlist_pageInfo {
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

export interface UserWishlist_me_wishlist_edges_node_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface UserWishlist_me_wishlist_edges_node_variants_edges_node {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface UserWishlist_me_wishlist_edges_node_variants_edges {
  __typename: "ProductVariantCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: UserWishlist_me_wishlist_edges_node_variants_edges_node;
}

export interface UserWishlist_me_wishlist_edges_node_variants {
  __typename: "ProductVariantCountableConnection";
  edges: UserWishlist_me_wishlist_edges_node_variants_edges[];
}

export interface UserWishlist_me_wishlist_edges_node {
  __typename: "WishlistItem";
  /**
   * The ID of the object.
   */
  id: string;
  product: UserWishlist_me_wishlist_edges_node_product;
  variants: UserWishlist_me_wishlist_edges_node_variants;
}

export interface UserWishlist_me_wishlist_edges {
  __typename: "WishlistItemCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: UserWishlist_me_wishlist_edges_node;
}

export interface UserWishlist_me_wishlist {
  __typename: "WishlistItemCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: UserWishlist_me_wishlist_pageInfo;
  edges: UserWishlist_me_wishlist_edges[];
}

export interface UserWishlist_me {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * User's wishlist.
   */
  wishlist: UserWishlist_me_wishlist | null;
}

export interface UserWishlist {
  /**
   * Return the currently authenticated user.
   */
  me: UserWishlist_me | null;
}
