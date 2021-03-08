/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CountryCode } from "./../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: ProductDetails
// ====================================================

export interface ProductDetails_product_thumbnail {
  __typename: "Image";
  url: string;
  alt: string | null;
}

export interface ProductDetails_product_thumbnail2x {
  __typename: "Image";
  url: string;
}

export interface ProductDetails_product_pricing_priceRangeUndiscounted_start_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface ProductDetails_product_pricing_priceRangeUndiscounted_start_net {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface ProductDetails_product_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  gross: ProductDetails_product_pricing_priceRangeUndiscounted_start_gross;
  net: ProductDetails_product_pricing_priceRangeUndiscounted_start_net;
}

export interface ProductDetails_product_pricing_priceRangeUndiscounted_stop_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface ProductDetails_product_pricing_priceRangeUndiscounted_stop_net {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface ProductDetails_product_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  gross: ProductDetails_product_pricing_priceRangeUndiscounted_stop_gross;
  net: ProductDetails_product_pricing_priceRangeUndiscounted_stop_net;
}

export interface ProductDetails_product_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  start: ProductDetails_product_pricing_priceRangeUndiscounted_start | null;
  stop: ProductDetails_product_pricing_priceRangeUndiscounted_stop | null;
}

export interface ProductDetails_product_pricing_priceRange_start_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface ProductDetails_product_pricing_priceRange_start_net {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface ProductDetails_product_pricing_priceRange_start {
  __typename: "TaxedMoney";
  gross: ProductDetails_product_pricing_priceRange_start_gross;
  net: ProductDetails_product_pricing_priceRange_start_net;
}

export interface ProductDetails_product_pricing_priceRange_stop_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface ProductDetails_product_pricing_priceRange_stop_net {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface ProductDetails_product_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  gross: ProductDetails_product_pricing_priceRange_stop_gross;
  net: ProductDetails_product_pricing_priceRange_stop_net;
}

export interface ProductDetails_product_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  start: ProductDetails_product_pricing_priceRange_start | null;
  stop: ProductDetails_product_pricing_priceRange_stop | null;
}

export interface ProductDetails_product_pricing {
  __typename: "ProductPricingInfo";
  onSale: boolean | null;
  priceRangeUndiscounted: ProductDetails_product_pricing_priceRangeUndiscounted | null;
  priceRange: ProductDetails_product_pricing_priceRange | null;
}

export interface ProductDetails_product_category_products_edges_node_thumbnail {
  __typename: "Image";
  url: string;
  alt: string | null;
}

export interface ProductDetails_product_category_products_edges_node_thumbnail2x {
  __typename: "Image";
  url: string;
}

export interface ProductDetails_product_category_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface ProductDetails_product_category_products_edges_node_pricing_priceRangeUndiscounted_start_net {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface ProductDetails_product_category_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  gross: ProductDetails_product_category_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
  net: ProductDetails_product_category_products_edges_node_pricing_priceRangeUndiscounted_start_net;
}

export interface ProductDetails_product_category_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface ProductDetails_product_category_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface ProductDetails_product_category_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  gross: ProductDetails_product_category_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
  net: ProductDetails_product_category_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
}

export interface ProductDetails_product_category_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  start: ProductDetails_product_category_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  stop: ProductDetails_product_category_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface ProductDetails_product_category_products_edges_node_pricing_priceRange_start_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface ProductDetails_product_category_products_edges_node_pricing_priceRange_start_net {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface ProductDetails_product_category_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  gross: ProductDetails_product_category_products_edges_node_pricing_priceRange_start_gross;
  net: ProductDetails_product_category_products_edges_node_pricing_priceRange_start_net;
}

export interface ProductDetails_product_category_products_edges_node_pricing_priceRange_stop_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface ProductDetails_product_category_products_edges_node_pricing_priceRange_stop_net {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface ProductDetails_product_category_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  gross: ProductDetails_product_category_products_edges_node_pricing_priceRange_stop_gross;
  net: ProductDetails_product_category_products_edges_node_pricing_priceRange_stop_net;
}

export interface ProductDetails_product_category_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  start: ProductDetails_product_category_products_edges_node_pricing_priceRange_start | null;
  stop: ProductDetails_product_category_products_edges_node_pricing_priceRange_stop | null;
}

export interface ProductDetails_product_category_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  onSale: boolean | null;
  priceRangeUndiscounted: ProductDetails_product_category_products_edges_node_pricing_priceRangeUndiscounted | null;
  priceRange: ProductDetails_product_category_products_edges_node_pricing_priceRange | null;
}

export interface ProductDetails_product_category_products_edges_node {
  __typename: "Product";
  id: string;
  name: string;
  thumbnail: ProductDetails_product_category_products_edges_node_thumbnail | null;
  thumbnail2x: ProductDetails_product_category_products_edges_node_thumbnail2x | null;
  pricing: ProductDetails_product_category_products_edges_node_pricing | null;
}

export interface ProductDetails_product_category_products_edges {
  __typename: "ProductCountableEdge";
  node: ProductDetails_product_category_products_edges_node;
}

export interface ProductDetails_product_category_products {
  __typename: "ProductCountableConnection";
  edges: ProductDetails_product_category_products_edges[];
}

export interface ProductDetails_product_category {
  __typename: "Category";
  id: string;
  name: string;
  products: ProductDetails_product_category_products | null;
}

export interface ProductDetails_product_images {
  __typename: "ProductImage";
  id: string;
  alt: string;
  url: string;
}

export interface ProductDetails_product_attributes_attribute {
  __typename: "Attribute";
  id: string;
  name: string | null;
}

export interface ProductDetails_product_attributes_values {
  __typename: "AttributeValue";
  id: string;
  name: string | null;
}

export interface ProductDetails_product_attributes {
  __typename: "SelectedAttribute";
  attribute: ProductDetails_product_attributes_attribute;
  values: (ProductDetails_product_attributes_values | null)[];
}

export interface ProductDetails_product_variants_images {
  __typename: "ProductImage";
  id: string;
  url: string;
  alt: string;
}

export interface ProductDetails_product_variants_pricing_priceUndiscounted_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface ProductDetails_product_variants_pricing_priceUndiscounted_net {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface ProductDetails_product_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  gross: ProductDetails_product_variants_pricing_priceUndiscounted_gross;
  net: ProductDetails_product_variants_pricing_priceUndiscounted_net;
}

export interface ProductDetails_product_variants_pricing_price_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface ProductDetails_product_variants_pricing_price_net {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface ProductDetails_product_variants_pricing_price {
  __typename: "TaxedMoney";
  gross: ProductDetails_product_variants_pricing_price_gross;
  net: ProductDetails_product_variants_pricing_price_net;
}

export interface ProductDetails_product_variants_pricing {
  __typename: "VariantPricingInfo";
  onSale: boolean | null;
  priceUndiscounted: ProductDetails_product_variants_pricing_priceUndiscounted | null;
  price: ProductDetails_product_variants_pricing_price | null;
}

export interface ProductDetails_product_variants_attributes_attribute {
  __typename: "Attribute";
  id: string;
  name: string | null;
  slug: string | null;
}

export interface ProductDetails_product_variants_attributes_values {
  __typename: "AttributeValue";
  id: string;
  name: string | null;
  value: string | null;
}

export interface ProductDetails_product_variants_attributes {
  __typename: "SelectedAttribute";
  attribute: ProductDetails_product_variants_attributes_attribute;
  values: (ProductDetails_product_variants_attributes_values | null)[];
}

export interface ProductDetails_product_variants {
  __typename: "ProductVariant";
  id: string;
  sku: string;
  name: string;
  quantityAvailable: number;
  images: (ProductDetails_product_variants_images | null)[] | null;
  pricing: ProductDetails_product_variants_pricing | null;
  attributes: ProductDetails_product_variants_attributes[];
}

export interface ProductDetails_product {
  __typename: "Product";
  id: string;
  name: string;
  thumbnail: ProductDetails_product_thumbnail | null;
  thumbnail2x: ProductDetails_product_thumbnail2x | null;
  pricing: ProductDetails_product_pricing | null;
  descriptionJson: any | null;
  category: ProductDetails_product_category | null;
  images: (ProductDetails_product_images | null)[] | null;
  attributes: ProductDetails_product_attributes[];
  variants: (ProductDetails_product_variants | null)[] | null;
  seoDescription: string | null;
  seoTitle: string | null;
  isAvailable: boolean | null;
  isAvailableForPurchase: boolean | null;
  availableForPurchase: any | null;
}

export interface ProductDetails {
  product: ProductDetails_product | null;
}

export interface ProductDetailsVariables {
  id: string;
  channel?: string | null;
  countryCode?: CountryCode | null;
}
