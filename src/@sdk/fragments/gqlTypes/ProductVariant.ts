/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductVariant
// ====================================================

export interface ProductVariant_pricing_priceUndiscounted_gross {
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

export interface ProductVariant_pricing_priceUndiscounted_net {
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

export interface ProductVariant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductVariant_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductVariant_pricing_priceUndiscounted_net;
}

export interface ProductVariant_pricing_price_gross {
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

export interface ProductVariant_pricing_price_net {
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

export interface ProductVariant_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: ProductVariant_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: ProductVariant_pricing_price_net;
}

export interface ProductVariant_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: ProductVariant_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: ProductVariant_pricing_price | null;
}

export interface ProductVariant_attributes_attribute {
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

export interface ProductVariant_attributes_values {
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

export interface ProductVariant_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: ProductVariant_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (ProductVariant_attributes_values | null)[];
}

export interface ProductVariant_product_thumbnail {
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

export interface ProductVariant_product_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface ProductVariant_product_productType {
  __typename: "ProductType";
  isShippingRequired: boolean;
}

export interface ProductVariant_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: ProductVariant_product_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: ProductVariant_product_thumbnail2x | null;
  productType: ProductVariant_product_productType;
}

export interface ProductVariant {
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
  pricing: ProductVariant_pricing | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: ProductVariant_attributes[];
  product: ProductVariant_product;
}
