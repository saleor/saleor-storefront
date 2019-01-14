/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: VariantList
// ====================================================

export interface VariantList_productVariants_edges_node_price {
  currency: string;
  amount: number;
  localized: string;
}

export interface VariantList_productVariants_edges_node_attributes_attribute {
  id: string;
  name: string | null;
}

export interface VariantList_productVariants_edges_node_attributes_value {
  id: string;
  name: string | null;
  value: string | null;
}

export interface VariantList_productVariants_edges_node_attributes {
  attribute: VariantList_productVariants_edges_node_attributes_attribute;
  value: VariantList_productVariants_edges_node_attributes_value;
}

export interface VariantList_productVariants_edges_node_product_thumbnail {
  url: string;
  alt: string | null;
}

export interface VariantList_productVariants_edges_node_product_thumbnail2x {
  url: string;
}

export interface VariantList_productVariants_edges_node_product {
  id: string;
  name: string;
  thumbnail: VariantList_productVariants_edges_node_product_thumbnail | null;
  thumbnail2x: VariantList_productVariants_edges_node_product_thumbnail2x | null;
}

export interface VariantList_productVariants_edges_node {
  id: string;
  name: string;
  stockQuantity: number;
  price: VariantList_productVariants_edges_node_price | null;
  attributes: VariantList_productVariants_edges_node_attributes[];
  product: VariantList_productVariants_edges_node_product;
}

export interface VariantList_productVariants_edges {
  node: VariantList_productVariants_edges_node;
}

export interface VariantList_productVariants {
  edges: VariantList_productVariants_edges[];
}

export interface VariantList {
  productVariants: VariantList_productVariants | null;
}

export interface VariantListVariables {
  ids?: string[] | null;
}
