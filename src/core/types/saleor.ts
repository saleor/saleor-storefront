/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: VariantList
// ====================================================

export interface VariantList_productVariant_costPrice {
  currency: string; // Currency code.
  amount: number; // Amount of money.
}

export interface VariantList_productVariant_product {
  id: string; // The ID of the object.
  name: string;
  thumbnailUrl: string | null; // The URL of a main thumbnail for a product.
}

export interface VariantList_productVariant {
  id: string; // The ID of the object.
  stockQuantity: number; // Quantity of a product available for sale.
  name: string;
  costPrice: VariantList_productVariant_costPrice | null; // Cost price of the variant.
  product: VariantList_productVariant_product;
}

export interface VariantList {
  productVariant: VariantList_productVariant | null; // Lookup a variant by ID.
}

export interface VariantListVariables {
  id: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Category
// ====================================================

export interface Category_category_backgroundImage {
  url: string; // The URL of the image.
}

export interface Category_category_ancestors_edges_node {
  id: string; // The ID of the object.
  name: string;
}

export interface Category_category_ancestors_edges {
  node: Category_category_ancestors_edges_node; // The item at the end of the edge
}

export interface Category_category_ancestors {
  edges: Category_category_ancestors_edges[];
}

export interface Category_category_products_edges_node_category {
  id: string; // The ID of the object.
  name: string;
}

export interface Category_category_products_edges_node_price {
  amount: number; // Amount of money.
  currency: string; // Currency code.
}

export interface Category_category_products_edges_node {
  id: string; // The ID of the object.
  name: string;
  thumbnailUrl: string | null; // The URL of a main thumbnail for a product.
  category: Category_category_products_edges_node_category;
  price: Category_category_products_edges_node_price | null; // The product's base price (without any discounts         applied).
}

export interface Category_category_products_edges {
  node: Category_category_products_edges_node; // The item at the end of the edge
}

export interface Category_category_products {
  totalCount: number | null; // A total count of items in the collection
  edges: Category_category_products_edges[];
}

export interface Category_category {
  id: string; // The ID of the object.
  name: string;
  backgroundImage: Category_category_backgroundImage | null;
  ancestors: Category_category_ancestors | null; // List of ancestors of the category.
  products: Category_category_products | null; // List of products in the category.
}

export interface Category_attributes_edges_node_values {
  id: string; // The ID of the object.
  name: string | null; // Visible name for display purposes.
}

export interface Category_attributes_edges_node {
  id: string; // The ID of the object.
  name: string | null; // Visible name for display purposes.
  values: (Category_attributes_edges_node_values | null)[] | null; // List of attribute's values.
}

export interface Category_attributes_edges {
  node: Category_attributes_edges_node; // The item at the end of the edge
}

export interface Category_attributes {
  edges: Category_attributes_edges[];
}

export interface Category {
  category: Category_category | null; // Lookup a category by ID.
  attributes: Category_attributes | null; // List of the shop's product attributes.
}

export interface CategoryVariables {
  id: string;
  attributes?: (any | null)[] | null;
  pageSize?: number | null;
  sortBy?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Collections
// ====================================================

export interface Collections_collections_edges_node {
  id: string; // The ID of the object.
  name: string;
}

export interface Collections_collections_edges {
  node: Collections_collections_edges_node; // The item at the end of the edge
}

export interface Collections_collections {
  edges: Collections_collections_edges[];
}

export interface Collections {
  collections: Collections_collections | null; // List of the shop's collections.
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductsList
// ====================================================

export interface ProductsList_shop_homepageCollection_products_edges_node_category {
  id: string; // The ID of the object.
  name: string;
}

export interface ProductsList_shop_homepageCollection_products_edges_node_price {
  currency: string; // Currency code.
  amount: number; // Amount of money.
}

export interface ProductsList_shop_homepageCollection_products_edges_node {
  id: string; // The ID of the object.
  name: string;
  thumbnailUrl: string | null; // The URL of a main thumbnail for a product.
  category: ProductsList_shop_homepageCollection_products_edges_node_category;
  price: ProductsList_shop_homepageCollection_products_edges_node_price | null; // The product's base price (without any discounts         applied).
}

export interface ProductsList_shop_homepageCollection_products_edges {
  node: ProductsList_shop_homepageCollection_products_edges_node; // The item at the end of the edge
}

export interface ProductsList_shop_homepageCollection_products {
  edges: ProductsList_shop_homepageCollection_products_edges[];
}

export interface ProductsList_shop_homepageCollection {
  id: string; // The ID of the object.
  products: ProductsList_shop_homepageCollection_products | null; // List of collection products.
}

export interface ProductsList_shop {
  homepageCollection: ProductsList_shop_homepageCollection | null; // Collection displayed on homepage
}

export interface ProductsList_categories_edges_node_backgroundImage {
  url: string; // The URL of the image.
}

export interface ProductsList_categories_edges_node {
  id: string; // The ID of the object.
  name: string;
  backgroundImage: ProductsList_categories_edges_node_backgroundImage | null;
}

export interface ProductsList_categories_edges {
  node: ProductsList_categories_edges_node; // The item at the end of the edge
}

export interface ProductsList_categories {
  edges: ProductsList_categories_edges[];
}

export interface ProductsList {
  shop: ProductsList_shop | null; // Represents a shop resources.
  categories: ProductsList_categories | null; // List of the shop's categories.
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MainMenu
// ====================================================

export interface MainMenu_shop_navigation_main_items_edges_node {
  id: string; // The ID of the object.
  name: string;
}

export interface MainMenu_shop_navigation_main_items_edges {
  node: MainMenu_shop_navigation_main_items_edges_node; // The item at the end of the edge
}

export interface MainMenu_shop_navigation_main_items {
  edges: MainMenu_shop_navigation_main_items_edges[];
}

export interface MainMenu_shop_navigation_main {
  id: string; // The ID of the object.
  items: MainMenu_shop_navigation_main_items | null;
}

export interface MainMenu_shop_navigation {
  main: MainMenu_shop_navigation_main | null; // Main navigation bar.
}

export interface MainMenu_shop {
  navigation: MainMenu_shop_navigation | null; // Shop's navigation.
}

export interface MainMenu {
  shop: MainMenu_shop | null; // Represents a shop resources.
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Categories
// ====================================================

export interface Categories_categories_edges_node {
  id: string; // The ID of the object.
  name: string;
  url: string | null; // The storefront's URL for the category.
}

export interface Categories_categories_edges {
  node: Categories_categories_edges_node; // The item at the end of the edge
}

export interface Categories_categories {
  edges: Categories_categories_edges[];
}

export interface Categories {
  categories: Categories_categories | null; // List of the shop's categories.
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductDetails
// ====================================================

export interface ProductDetails_product_category_products_edges_node_category {
  id: string; // The ID of the object.
  name: string;
}

export interface ProductDetails_product_category_products_edges_node_price {
  amount: number; // Amount of money.
  currency: string; // Currency code.
}

export interface ProductDetails_product_category_products_edges_node {
  id: string; // The ID of the object.
  name: string;
  thumbnailUrl: string | null; // The URL of a main thumbnail for a product.
  category: ProductDetails_product_category_products_edges_node_category;
  price: ProductDetails_product_category_products_edges_node_price | null; // The product's base price (without any discounts         applied).
}

export interface ProductDetails_product_category_products_edges {
  node: ProductDetails_product_category_products_edges_node; // The item at the end of the edge
}

export interface ProductDetails_product_category_products {
  edges: ProductDetails_product_category_products_edges[];
}

export interface ProductDetails_product_category {
  id: string; // The ID of the object.
  name: string;
  products: ProductDetails_product_category_products | null; // List of products in the category.
}

export interface ProductDetails_product_price {
  amount: number; // Amount of money.
  currency: string; // Currency code.
}

export interface ProductDetails_product_images_edges_node {
  id: string; // The ID of the object.
  url: string; // The URL of the image.
}

export interface ProductDetails_product_images_edges {
  node: ProductDetails_product_images_edges_node; // The item at the end of the edge
}

export interface ProductDetails_product_images {
  edges: ProductDetails_product_images_edges[];
}

export interface ProductDetails_product_variants_edges_node {
  id: string; // The ID of the object.
  name: string;
}

export interface ProductDetails_product_variants_edges {
  node: ProductDetails_product_variants_edges_node; // The item at the end of the edge
}

export interface ProductDetails_product_variants {
  edges: ProductDetails_product_variants_edges[];
}

export interface ProductDetails_product {
  id: string; // The ID of the object.
  name: string;
  thumbnailUrl: string | null; // The URL of a main thumbnail for a product.
  description: string;
  category: ProductDetails_product_category;
  price: ProductDetails_product_price | null; // The product's base price (without any discounts         applied).
  images: ProductDetails_product_images | null;
  variants: ProductDetails_product_variants | null;
}

export interface ProductDetails {
  product: ProductDetails_product | null; // Lookup a product by ID.
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
  currency: string; // Currency code.
  amount: number; // Amount of money.
}

export interface ProductVariantDetails_productVariant_product {
  id: string; // The ID of the object.
  name: string;
  thumbnailUrl: string | null; // The URL of a main thumbnail for a product.
}

export interface ProductVariantDetails_productVariant {
  id: string; // The ID of the object.
  stockQuantity: number; // Quantity of a product available for sale.
  costPrice: ProductVariantDetails_productVariant_costPrice | null; // Cost price of the variant.
  product: ProductVariantDetails_productVariant_product;
}

export interface ProductVariantDetails {
  productVariant: ProductVariantDetails_productVariant | null; // Lookup a variant by ID.
}

export interface ProductVariantDetailsVariables {
  id: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchResults
// ====================================================

export interface SearchResults_products_edges_node_category {
  id: string; // The ID of the object.
  name: string;
}

export interface SearchResults_products_edges_node {
  id: string; // The ID of the object.
  name: string;
  thumbnailUrl: string | null; // The URL of a main thumbnail for a product.
  url: string; // The storefront URL for the product.
  category: SearchResults_products_edges_node_category;
}

export interface SearchResults_products_edges {
  node: SearchResults_products_edges_node; // The item at the end of the edge
}

export interface SearchResults_products {
  edges: SearchResults_products_edges[];
}

export interface SearchResults {
  products: SearchResults_products | null; // List of the shop's products.
}

export interface SearchResultsVariables {
  query: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BasicProductFields
// ====================================================

export interface BasicProductFields {
  id: string; // The ID of the object.
  name: string;
  thumbnailUrl: string | null; // The URL of a main thumbnail for a product.
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
