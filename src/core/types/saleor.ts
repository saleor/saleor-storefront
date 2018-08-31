

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: VariantList
// ====================================================

export interface VariantList_productVariant_costPrice {
  currency: string;  // Currency code.
  amount: number;    // Amount of money.
}

export interface VariantList_productVariant_product {
  id: string;                   // The ID of the object.
  name: string;
  thumbnailUrl: string | null;  // The URL of a main thumbnail for a product.
}

export interface VariantList_productVariant {
  id: string;                                              // The ID of the object.
  stockQuantity: number;                                   // Quantity of a product available for sale.
  costPrice: VariantList_productVariant_costPrice | null;  // Cost price of the variant.
  product: VariantList_productVariant_product;
}

export interface VariantList {
  productVariant: VariantList_productVariant | null;  // Lookup a variant by ID.
}

export interface VariantListVariables {
  id: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductsList
// ====================================================

export interface ProductsList_products_edges_node_category {
  id: string;  // The ID of the object.
  name: string;
}

export interface ProductsList_products_edges_node_price {
  amount: number;  // Amount of money.
}

export interface ProductsList_products_edges_node {
  id: string;                                            // The ID of the object.
  name: string;
  thumbnailUrl: string | null;                           // The URL of a main thumbnail for a product.
  category: ProductsList_products_edges_node_category;
  price: ProductsList_products_edges_node_price | null;  // The product's base price (without any discounts         applied).
}

export interface ProductsList_products_edges {
  node: ProductsList_products_edges_node;  // The item at the end of the edge
}

export interface ProductsList_products {
  edges: ProductsList_products_edges[];
}

export interface ProductsList_categories_edges_node {
  id: string;  // The ID of the object.
  name: string;
}

export interface ProductsList_categories_edges {
  node: ProductsList_categories_edges_node;  // The item at the end of the edge
}

export interface ProductsList_categories {
  edges: ProductsList_categories_edges[];
}

export interface ProductsList {
  products: ProductsList_products | null;      // List of the shop's products.
  categories: ProductsList_categories | null;  // List of the shop's categories.
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MainMenu
// ====================================================

export interface MainMenu_shop_navigation_main_items_edges_node {
  id: string;          // The ID of the object.
  name: string;
  url: string | null;  // URL to the menu item.
}

export interface MainMenu_shop_navigation_main_items_edges {
  node: MainMenu_shop_navigation_main_items_edges_node;  // The item at the end of the edge
}

export interface MainMenu_shop_navigation_main_items {
  edges: MainMenu_shop_navigation_main_items_edges[];
}

export interface MainMenu_shop_navigation_main {
  items: MainMenu_shop_navigation_main_items | null;
}

export interface MainMenu_shop_navigation {
  main: MainMenu_shop_navigation_main | null;  // Main navigation bar.
}

export interface MainMenu_shop {
  navigation: MainMenu_shop_navigation | null;  // Shop's navigation.
}

export interface MainMenu {
  shop: MainMenu_shop | null;  // Represents a shop resources.
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Categories
// ====================================================

export interface Categories_categories_edges_node {
  id: string;          // The ID of the object.
  name: string;
  url: string | null;  // The storefront's URL for the category.
}

export interface Categories_categories_edges {
  node: Categories_categories_edges_node;  // The item at the end of the edge
}

export interface Categories_categories {
  edges: Categories_categories_edges[];
}

export interface Categories {
  categories: Categories_categories | null;  // List of the shop's categories.
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductDetails
// ====================================================

export interface ProductDetails_product_variants_edges_node {
  id: string;  // The ID of the object.
  name: string;
}

export interface ProductDetails_product_variants_edges {
  node: ProductDetails_product_variants_edges_node;  // The item at the end of the edge
}

export interface ProductDetails_product_variants {
  edges: ProductDetails_product_variants_edges[];
}

export interface ProductDetails_product {
  id: string;                   // The ID of the object.
  name: string;
  thumbnailUrl: string | null;  // The URL of a main thumbnail for a product.
  description: string;
  variants: ProductDetails_product_variants | null;
}

export interface ProductDetails {
  product: ProductDetails_product | null;  // Lookup a product by ID.
}

export interface ProductDetailsVariables {
  id: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductVariantDetails
// ====================================================

export interface ProductVariantDetails_productVariant_costPrice {
  currency: string;  // Currency code.
  amount: number;    // Amount of money.
}

export interface ProductVariantDetails_productVariant_product {
  id: string;                   // The ID of the object.
  name: string;
  thumbnailUrl: string | null;  // The URL of a main thumbnail for a product.
}

export interface ProductVariantDetails_productVariant {
  id: string;                                                        // The ID of the object.
  stockQuantity: number;                                             // Quantity of a product available for sale.
  costPrice: ProductVariantDetails_productVariant_costPrice | null;  // Cost price of the variant.
  product: ProductVariantDetails_productVariant_product;
}

export interface ProductVariantDetails {
  productVariant: ProductVariantDetails_productVariant | null;  // Lookup a variant by ID.
}

export interface ProductVariantDetailsVariables {
  id: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BasicProductFields
// ====================================================

export interface BasicProductFields {
  id: string;                   // The ID of the object.
  name: string;
  thumbnailUrl: string | null;  // The URL of a main thumbnail for a product.
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================