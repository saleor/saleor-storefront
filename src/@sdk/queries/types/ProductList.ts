/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AttributeInput, ProductOrder } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL query operation: ProductList
// ====================================================

export interface ProductList_products_edges_node_thumbnail {
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

export interface ProductList_products_edges_node_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface ProductList_products_edges_node_price {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Money formatted according to the current locale.
   */
  localized: string;
}

export interface ProductList_products_edges_node_pricing_priceRange_start_gross {
  __typename: "Money";
  /**
   * Money formatted according to the current locale.
   */
  localized: string;
}

export interface ProductList_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductList_products_edges_node_pricing_priceRange_start_gross;
}

export interface ProductList_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: ProductList_products_edges_node_pricing_priceRange_start | null;
}

export interface ProductList_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The discounted price range of the product variants.
   */
  priceRange: ProductList_products_edges_node_pricing_priceRange | null;
}

export interface ProductList_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface ProductList_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: ProductList_products_edges_node_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: ProductList_products_edges_node_thumbnail2x | null;
  /**
   * The product's default base price.
   */
  price: ProductList_products_edges_node_price | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: ProductList_products_edges_node_pricing | null;
  category: ProductList_products_edges_node_category | null;
}

export interface ProductList_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductList_products_edges_node;
}

export interface ProductList_products_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: boolean;
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor: string | null;
}

export interface ProductList_products {
  __typename: "ProductCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: ProductList_products_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: ProductList_products_pageInfo;
}

export interface ProductList {
  /**
   * List of the shop's products.
   */
  products: ProductList_products | null;
}

export interface ProductListVariables {
  id: string;
  attributes?: (AttributeInput | null)[] | null;
  after?: string | null;
  pageSize?: number | null;
  sortBy?: ProductOrder | null;
  priceLte?: number | null;
  priceGte?: number | null;
}
