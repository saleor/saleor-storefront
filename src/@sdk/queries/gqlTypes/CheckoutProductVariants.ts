/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CheckoutProductVariants
// ====================================================

export interface CheckoutProductVariants_productVariants_edges_node_pricing_priceUndiscounted_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface CheckoutProductVariants_productVariants_edges_node_pricing_priceUndiscounted_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface CheckoutProductVariants_productVariants_edges_node_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: CheckoutProductVariants_productVariants_edges_node_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: CheckoutProductVariants_productVariants_edges_node_pricing_priceUndiscounted_net;
}

export interface CheckoutProductVariants_productVariants_edges_node_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface CheckoutProductVariants_productVariants_edges_node_pricing_price_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface CheckoutProductVariants_productVariants_edges_node_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: CheckoutProductVariants_productVariants_edges_node_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: CheckoutProductVariants_productVariants_edges_node_pricing_price_net;
}

export interface CheckoutProductVariants_productVariants_edges_node_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: CheckoutProductVariants_productVariants_edges_node_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: CheckoutProductVariants_productVariants_edges_node_pricing_price | null;
}

export interface CheckoutProductVariants_productVariants_edges_node_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
}

export interface CheckoutProductVariants_productVariants_edges_node_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Name of a value displayed in the interface.
   */
  value: string | null;
}

export interface CheckoutProductVariants_productVariants_edges_node_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: CheckoutProductVariants_productVariants_edges_node_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (CheckoutProductVariants_productVariants_edges_node_attributes_values | null)[];
}

export interface CheckoutProductVariants_productVariants_edges_node_product_thumbnail {
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

export interface CheckoutProductVariants_productVariants_edges_node_product_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface CheckoutProductVariants_productVariants_edges_node_product_productType {
  __typename: "ProductType";
  isShippingRequired: boolean;
}

export interface CheckoutProductVariants_productVariants_edges_node_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: CheckoutProductVariants_productVariants_edges_node_product_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: CheckoutProductVariants_productVariants_edges_node_product_thumbnail2x | null;
  productType: CheckoutProductVariants_productVariants_edges_node_product_productType;
}

export interface CheckoutProductVariants_productVariants_edges_node {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  sku: string;
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * Whether the variant is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: CheckoutProductVariants_productVariants_edges_node_pricing | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: CheckoutProductVariants_productVariants_edges_node_attributes[];
  product: CheckoutProductVariants_productVariants_edges_node_product;
}

export interface CheckoutProductVariants_productVariants_edges {
  __typename: "ProductVariantCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: CheckoutProductVariants_productVariants_edges_node;
}

export interface CheckoutProductVariants_productVariants {
  __typename: "ProductVariantCountableConnection";
  edges: CheckoutProductVariants_productVariants_edges[];
}

export interface CheckoutProductVariants {
  /**
   * List of product variants.
   */
  productVariants: CheckoutProductVariants_productVariants | null;
}

export interface CheckoutProductVariantsVariables {
  ids?: (string | null)[] | null;
}
