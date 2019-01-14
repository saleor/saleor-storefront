/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductsList
// ====================================================

export interface ProductsList_shop_homepageCollection_backgroundImage {
  url: string;
}

export interface ProductsList_shop_homepageCollection {
  id: string;
  backgroundImage: ProductsList_shop_homepageCollection_backgroundImage | null;
  name: string;
}

export interface ProductsList_shop {
  description: string | null;
  name: string;
  homepageCollection: ProductsList_shop_homepageCollection | null;
}

export interface ProductsList_categories_edges_node_backgroundImage {
  url: string;
}

export interface ProductsList_categories_edges_node {
  id: string;
  name: string;
  backgroundImage: ProductsList_categories_edges_node_backgroundImage | null;
}

export interface ProductsList_categories_edges {
  node: ProductsList_categories_edges_node;
}

export interface ProductsList_categories {
  edges: ProductsList_categories_edges[];
}

export interface ProductsList {
  shop: ProductsList_shop | null;
  categories: ProductsList_categories | null;
}
