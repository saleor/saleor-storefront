/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FeaturedProducts
// ====================================================

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_thumbnail {
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

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
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

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRangeUndiscounted_start_net {
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

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRangeUndiscounted_start_net;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
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

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
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

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRange_start_gross {
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

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRange_start_net {
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

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRange_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRange_start_net;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRange_stop_gross {
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

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRange_stop_net {
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

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRange_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRange_stop_net;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRange_stop | null;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRange | null;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: FeaturedProducts_shop_homepageCollection_products_edges_node_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: FeaturedProducts_shop_homepageCollection_products_edges_node_thumbnail2x | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing | null;
  category: FeaturedProducts_shop_homepageCollection_products_edges_node_category;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: FeaturedProducts_shop_homepageCollection_products_edges_node;
}

export interface FeaturedProducts_shop_homepageCollection_products {
  __typename: "ProductCountableConnection";
  edges: FeaturedProducts_shop_homepageCollection_products_edges[];
}

export interface FeaturedProducts_shop_homepageCollection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of products in this collection.
   */
  products: FeaturedProducts_shop_homepageCollection_products | null;
}

export interface FeaturedProducts_shop {
  __typename: "Shop";
  /**
   * Collection displayed on homepage.
   */
  homepageCollection: FeaturedProducts_shop_homepageCollection | null;
}

export interface FeaturedProducts {
  /**
   * Return information about the shop.
   */
  shop: FeaturedProducts_shop | null;
}
