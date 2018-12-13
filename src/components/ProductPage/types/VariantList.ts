/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: VariantList
// ====================================================

export interface VariantList_productVariants_edges_node_price {
  __typename: "Money";
  currency: string;
  amount: number;
  localized: string;
}

export interface VariantList_productVariants_edges_node_attributes_attribute {
  __typename: "Attribute";
  id: string;
  name: string | null;
}

export interface VariantList_productVariants_edges_node_attributes_value {
  __typename: "AttributeValue";
  id: string;
  name: string | null;
  value: string | null;
}

export interface VariantList_productVariants_edges_node_attributes {
  __typename: "SelectedAttribute";
  attribute: VariantList_productVariants_edges_node_attributes_attribute;
  value: VariantList_productVariants_edges_node_attributes_value;
}

export interface VariantList_productVariants_edges_node_product {
  __typename: "Product";
  id: string;
  name: string;
  thumbnailUrl: string | null;
  thumbnailUrl2x: string | null;
}

export interface VariantList_productVariants_edges_node {
  __typename: "ProductVariant";
  id: string;
  name: string;
  stockQuantity: number;
  price: VariantList_productVariants_edges_node_price | null;
  attributes: VariantList_productVariants_edges_node_attributes[];
  product: VariantList_productVariants_edges_node_product;
}

export interface VariantList_productVariants_edges {
  __typename: "ProductVariantCountableEdge";
  node: VariantList_productVariants_edges_node;
}

export interface VariantList_productVariants {
  __typename: "ProductVariantCountableConnection";
  edges: VariantList_productVariants_edges[];
}

export interface VariantList {
  productVariants: VariantList_productVariants | null;
}

export interface VariantListVariables {
  ids?: string[] | null;
}
