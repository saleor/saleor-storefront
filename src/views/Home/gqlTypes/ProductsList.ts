/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductsList
// ====================================================

export interface ProductsList_shop {
  __typename: "Shop";
  description: string | null;
  name: string;
}

export interface ProductsList_collection_backgroundImage {
  __typename: "Image";
  url: string;
  alt: string | null;
}

export interface ProductsList_collection {
  __typename: "Collection";
  backgroundImage: ProductsList_collection_backgroundImage | null;
}

export interface ProductsList_categories_edges_node_backgroundImage {
  __typename: "Image";
  url: string;
}

export interface ProductsList_categories_edges_node {
  __typename: "Category";
  id: string;
  name: string;
  backgroundImage: ProductsList_categories_edges_node_backgroundImage | null;
}

export interface ProductsList_categories_edges {
  __typename: "CategoryCountableEdge";
  node: ProductsList_categories_edges_node;
}

export interface ProductsList_categories {
  __typename: "CategoryCountableConnection";
  edges: ProductsList_categories_edges[];
}

export interface ProductsList {
  shop: ProductsList_shop;
  collection: ProductsList_collection | null;
  categories: ProductsList_categories | null;
}

export interface ProductsListVariables {
  channel?: string | null;
}
