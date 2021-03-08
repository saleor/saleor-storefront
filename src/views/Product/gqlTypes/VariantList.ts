/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CountryCode } from "./../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: VariantList
// ====================================================

export interface VariantList_productVariants_edges_node_images {
  __typename: "ProductImage";
  id: string;
  url: string;
  alt: string;
}

export interface VariantList_productVariants_edges_node_pricing_priceUndiscounted_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface VariantList_productVariants_edges_node_pricing_priceUndiscounted_net {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface VariantList_productVariants_edges_node_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  gross: VariantList_productVariants_edges_node_pricing_priceUndiscounted_gross;
  net: VariantList_productVariants_edges_node_pricing_priceUndiscounted_net;
}

export interface VariantList_productVariants_edges_node_pricing_price_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface VariantList_productVariants_edges_node_pricing_price_net {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface VariantList_productVariants_edges_node_pricing_price {
  __typename: "TaxedMoney";
  gross: VariantList_productVariants_edges_node_pricing_price_gross;
  net: VariantList_productVariants_edges_node_pricing_price_net;
}

export interface VariantList_productVariants_edges_node_pricing {
  __typename: "VariantPricingInfo";
  onSale: boolean | null;
  priceUndiscounted: VariantList_productVariants_edges_node_pricing_priceUndiscounted | null;
  price: VariantList_productVariants_edges_node_pricing_price | null;
}

export interface VariantList_productVariants_edges_node_attributes_attribute {
  __typename: "Attribute";
  id: string;
  name: string | null;
  slug: string | null;
}

export interface VariantList_productVariants_edges_node_attributes_values {
  __typename: "AttributeValue";
  id: string;
  name: string | null;
  value: string | null;
}

export interface VariantList_productVariants_edges_node_attributes {
  __typename: "SelectedAttribute";
  attribute: VariantList_productVariants_edges_node_attributes_attribute;
  values: (VariantList_productVariants_edges_node_attributes_values | null)[];
}

export interface VariantList_productVariants_edges_node_product_thumbnail {
  __typename: "Image";
  url: string;
  alt: string | null;
}

export interface VariantList_productVariants_edges_node_product_thumbnail2x {
  __typename: "Image";
  url: string;
}

export interface VariantList_productVariants_edges_node_product {
  __typename: "Product";
  id: string;
  name: string;
  thumbnail: VariantList_productVariants_edges_node_product_thumbnail | null;
  thumbnail2x: VariantList_productVariants_edges_node_product_thumbnail2x | null;
}

export interface VariantList_productVariants_edges_node {
  __typename: "ProductVariant";
  id: string;
  sku: string;
  name: string;
  quantityAvailable: number;
  images: (VariantList_productVariants_edges_node_images | null)[] | null;
  pricing: VariantList_productVariants_edges_node_pricing | null;
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
  channel?: string | null;
  countryCode?: CountryCode | null;
}
