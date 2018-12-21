/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductsList
// ====================================================

export interface ProductsList_shop_homepageCollection_products_edges_node_price {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface ProductsList_shop_homepageCollection_products_edges_node_category {
  __typename: "Category";
  id: string;
  name: string;
}

export interface ProductsList_shop_homepageCollection_products_edges_node {
  __typename: "Product";
  id: string;
  name: string;
  thumbnailUrl: string | null;
  thumbnailUrl2x: string | null;
  price: ProductsList_shop_homepageCollection_products_edges_node_price | null;
  category: ProductsList_shop_homepageCollection_products_edges_node_category;
}

export interface ProductsList_shop_homepageCollection_products_edges {
  __typename: "ProductCountableEdge";
  node: ProductsList_shop_homepageCollection_products_edges_node;
}

export interface ProductsList_shop_homepageCollection_products {
  __typename: "ProductCountableConnection";
  edges: ProductsList_shop_homepageCollection_products_edges[];
}

export interface ProductsList_shop_homepageCollection {
  __typename: "Collection";
  id: string;
  products: ProductsList_shop_homepageCollection_products | null;
}

export interface ProductsList_shop {
  __typename: "Shop";
  homepageCollection: ProductsList_shop_homepageCollection | null;
}

export interface ProductsList {
  shop: ProductsList_shop | null;
}
