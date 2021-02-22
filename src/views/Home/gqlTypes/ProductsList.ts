/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductsList
// ====================================================

export interface ProductsList_shop {
  __typename: "Shop";
  /**
   * Shop's description.
   */
  description: string | null;
  /**
   * Shop's name.
   */
  name: string;
}

export interface ProductsList_collection_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
  /**
   * Alt text for an image.
   */
  alt: string | null;
}

export interface ProductsList_collection {
  __typename: "Collection";
  backgroundImage: ProductsList_collection_backgroundImage | null;
}

export interface ProductsList_categories_edges_node_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface ProductsList_categories_edges_node {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  backgroundImage: ProductsList_categories_edges_node_backgroundImage | null;
}

export interface ProductsList_categories_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductsList_categories_edges_node;
}

export interface ProductsList_categories {
  __typename: "CategoryCountableConnection";
  edges: ProductsList_categories_edges[];
}

export interface ProductsList {
  /**
   * Return information about the shop.
   */
  shop: ProductsList_shop;
  /**
   * Look up a collection by ID.
   */
  collection: ProductsList_collection | null;
  /**
   * List of the shop's categories.
   */
  categories: ProductsList_categories | null;
}

export interface ProductsListVariables {
  channel?: string | null;
}
