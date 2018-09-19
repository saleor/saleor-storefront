

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Category
// ====================================================

export interface Category_category_backgroundImage {
  url: string;  // The URL of the image.
}

export interface Category_category_ancestors_edges_node {
  id: string;  // The ID of the object.
  name: string;
}

export interface Category_category_ancestors_edges {
  node: Category_category_ancestors_edges_node;  // The item at the end of the edge
}

export interface Category_category_ancestors {
  edges: Category_category_ancestors_edges[];
}

export interface Category_category_products_edges_node_category {
  id: string;  // The ID of the object.
  name: string;
}

export interface Category_category_products_edges_node_price {
  amount: number;    // Amount of money.
  currency: string;  // Currency code.
}

export interface Category_category_products_edges_node {
  id: string;                                                 // The ID of the object.
  name: string;
  thumbnailUrl: string | null;                                // The URL of a main thumbnail for a product.
  category: Category_category_products_edges_node_category;
  price: Category_category_products_edges_node_price | null;  // The product's base price (without any discounts         applied).
}

export interface Category_category_products_edges {
  node: Category_category_products_edges_node;  // The item at the end of the edge
}

export interface Category_category_products {
  totalCount: number | null;  // A total count of items in the collection
  edges: Category_category_products_edges[];
}

export interface Category_category {
  id: string;                                     // The ID of the object.
  name: string;
  backgroundImage: Category_category_backgroundImage | null;
  ancestors: Category_category_ancestors | null;  // List of ancestors of the category.
  products: Category_category_products | null;    // List of products in the category.
}

export interface Category_attributes_edges_node_values {
  id: string;           // The ID of the object.
  name: string | null;  // Visible name for display purposes.
}

export interface Category_attributes_edges_node {
  id: string;                                                       // The ID of the object.
  name: string | null;                                              // Visible name for display purposes.
  values: (Category_attributes_edges_node_values | null)[] | null;  // List of attribute's values.
}

export interface Category_attributes_edges {
  node: Category_attributes_edges_node;  // The item at the end of the edge
}

export interface Category_attributes {
  edges: Category_attributes_edges[];
}

export interface Category {
  category: Category_category | null;      // Lookup a category by ID.
  attributes: Category_attributes | null;  // List of the shop's product attributes.
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
// GraphQL mutation operation: createCheckout
// ====================================================

export interface createCheckout_checkoutCreate_checkout_lines_edges_node {
  id: string;  // The ID of the object.
  quantity: number;
}

export interface createCheckout_checkoutCreate_checkout_lines_edges {
  node: createCheckout_checkoutCreate_checkout_lines_edges_node;  // The item at the end of the edge
}

export interface createCheckout_checkoutCreate_checkout_lines {
  edges: createCheckout_checkoutCreate_checkout_lines_edges[];
}

export interface createCheckout_checkoutCreate_checkout {
  token: any;
  id: string;  // The ID of the object.
  lines: createCheckout_checkoutCreate_checkout_lines | null;
}

export interface createCheckout_checkoutCreate {
  checkout: createCheckout_checkoutCreate_checkout | null;
}

export interface createCheckout {
  checkoutCreate: createCheckout_checkoutCreate | null;
}

export interface createCheckoutVariables {
  checkoutInput: CheckoutCreateInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCheckout
// ====================================================

export interface getCheckout_checkout_totalPrice_net {
  amount: number;  // Amount of money.
}

export interface getCheckout_checkout_totalPrice_gross {
  amount: number;  // Amount of money.
}

export interface getCheckout_checkout_totalPrice {
  net: getCheckout_checkout_totalPrice_net;      // Amount of money without taxes.
  gross: getCheckout_checkout_totalPrice_gross;  // Amount of money including taxes.
  currency: string;                              // Currency code.
}

export interface getCheckout_checkout_subtotalPrice_net {
  amount: number;  // Amount of money.
}

export interface getCheckout_checkout_subtotalPrice_gross {
  amount: number;  // Amount of money.
}

export interface getCheckout_checkout_subtotalPrice {
  net: getCheckout_checkout_subtotalPrice_net;      // Amount of money without taxes.
  gross: getCheckout_checkout_subtotalPrice_gross;  // Amount of money including taxes.
  currency: string;                                 // Currency code.
}

export interface getCheckout_checkout_lines_edges_node_totalPrice_net {
  amount: number;  // Amount of money.
}

export interface getCheckout_checkout_lines_edges_node_totalPrice_gross {
  amount: number;  // Amount of money.
}

export interface getCheckout_checkout_lines_edges_node_totalPrice {
  net: getCheckout_checkout_lines_edges_node_totalPrice_net;      // Amount of money without taxes.
  gross: getCheckout_checkout_lines_edges_node_totalPrice_gross;  // Amount of money including taxes.
  currency: string;                                               // Currency code.
}

export interface getCheckout_checkout_lines_edges_node_variant_product_price {
  amount: number;    // Amount of money.
  currency: string;  // Currency code.
}

export interface getCheckout_checkout_lines_edges_node_variant_product {
  id: string;                                                                 // The ID of the object.
  name: string;
  thumbnailUrl: string | null;                                                // The URL of a main thumbnail for a product.
  price: getCheckout_checkout_lines_edges_node_variant_product_price | null;  // The product's base price (without any discounts         applied).
}

export interface getCheckout_checkout_lines_edges_node_variant {
  id: string;  // The ID of the object.
  name: string;
  product: getCheckout_checkout_lines_edges_node_variant_product;
}

export interface getCheckout_checkout_lines_edges_node {
  id: string;                                                           // The ID of the object.
  quantity: number;
  totalPrice: getCheckout_checkout_lines_edges_node_totalPrice | null;  // Total price
  variant: getCheckout_checkout_lines_edges_node_variant;
}

export interface getCheckout_checkout_lines_edges {
  node: getCheckout_checkout_lines_edges_node;  // The item at the end of the edge
}

export interface getCheckout_checkout_lines {
  edges: getCheckout_checkout_lines_edges[];
}

export interface getCheckout_checkout {
  token: any;
  id: string;                                                // The ID of the object.
  totalPrice: getCheckout_checkout_totalPrice | null;        // Total price
  subtotalPrice: getCheckout_checkout_subtotalPrice | null;  // Total without shipping
  lines: getCheckout_checkout_lines | null;
}

export interface getCheckout {
  checkout: getCheckout_checkout | null;  // Single checkout
}

export interface getCheckoutVariables {
  token: any;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Collections
// ====================================================

export interface Collections_collections_edges_node {
  id: string;  // The ID of the object.
  name: string;
}

export interface Collections_collections_edges {
  node: Collections_collections_edges_node;  // The item at the end of the edge
}

export interface Collections_collections {
  edges: Collections_collections_edges[];
}

export interface Collections {
  collections: Collections_collections | null;  // List of the shop's collections.
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductsList
// ====================================================

export interface ProductsList_shop_homepageCollection_backgroundImage {
  url: string;  // The URL of the image.
}

export interface ProductsList_shop_homepageCollection_products_edges_node_category {
  id: string;  // The ID of the object.
  name: string;
}

export interface ProductsList_shop_homepageCollection_products_edges_node_price {
  currency: string;  // Currency code.
  amount: number;    // Amount of money.
}

export interface ProductsList_shop_homepageCollection_products_edges_node {
  id: string;                                                                    // The ID of the object.
  name: string;
  thumbnailUrl: string | null;                                                   // The URL of a main thumbnail for a product.
  category: ProductsList_shop_homepageCollection_products_edges_node_category;
  price: ProductsList_shop_homepageCollection_products_edges_node_price | null;  // The product's base price (without any discounts         applied).
}

export interface ProductsList_shop_homepageCollection_products_edges {
  node: ProductsList_shop_homepageCollection_products_edges_node;  // The item at the end of the edge
}

export interface ProductsList_shop_homepageCollection_products {
  edges: ProductsList_shop_homepageCollection_products_edges[];
}

export interface ProductsList_shop_homepageCollection {
  id: string;                                                      // The ID of the object.
  backgroundImage: ProductsList_shop_homepageCollection_backgroundImage | null;
  products: ProductsList_shop_homepageCollection_products | null;  // List of collection products.
}

export interface ProductsList_shop {
  homepageCollection: ProductsList_shop_homepageCollection | null;  // Collection displayed on homepage
}

export interface ProductsList_categories_edges_node_backgroundImage {
  url: string;  // The URL of the image.
}

export interface ProductsList_categories_edges_node {
  id: string;  // The ID of the object.
  name: string;
  backgroundImage: ProductsList_categories_edges_node_backgroundImage | null;
}

export interface ProductsList_categories_edges {
  node: ProductsList_categories_edges_node;  // The item at the end of the edge
}

export interface ProductsList_categories {
  edges: ProductsList_categories_edges[];
}

export interface ProductsList {
  shop: ProductsList_shop | null;              // Represents a shop resources.
  categories: ProductsList_categories | null;  // List of the shop's categories.
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MainMenu
// ====================================================

export interface MainMenu_shop_navigation_main_items_edges_node {
  id: string;  // The ID of the object.
  name: string;
}

export interface MainMenu_shop_navigation_main_items_edges {
  node: MainMenu_shop_navigation_main_items_edges_node;  // The item at the end of the edge
}

export interface MainMenu_shop_navigation_main_items {
  edges: MainMenu_shop_navigation_main_items_edges[];
}

export interface MainMenu_shop_navigation_main {
  id: string;  // The ID of the object.
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

export interface ProductDetails_product_category_products_edges_node_category {
  id: string;  // The ID of the object.
  name: string;
}

export interface ProductDetails_product_category_products_edges_node_price {
  amount: number;    // Amount of money.
  currency: string;  // Currency code.
}

export interface ProductDetails_product_category_products_edges_node {
  id: string;                                                               // The ID of the object.
  name: string;
  thumbnailUrl: string | null;                                              // The URL of a main thumbnail for a product.
  category: ProductDetails_product_category_products_edges_node_category;
  price: ProductDetails_product_category_products_edges_node_price | null;  // The product's base price (without any discounts         applied).
}

export interface ProductDetails_product_category_products_edges {
  node: ProductDetails_product_category_products_edges_node;  // The item at the end of the edge
}

export interface ProductDetails_product_category_products {
  edges: ProductDetails_product_category_products_edges[];
}

export interface ProductDetails_product_category {
  id: string;                                                 // The ID of the object.
  name: string;
  products: ProductDetails_product_category_products | null;  // List of products in the category.
}

export interface ProductDetails_product_price {
  amount: number;    // Amount of money.
  currency: string;  // Currency code.
}

export interface ProductDetails_product_images_edges_node {
  id: string;   // The ID of the object.
  url: string;  // The URL of the image.
}

export interface ProductDetails_product_images_edges {
  node: ProductDetails_product_images_edges_node;  // The item at the end of the edge
}

export interface ProductDetails_product_images {
  edges: ProductDetails_product_images_edges[];
}

export interface ProductDetails_product_variants_edges_node_price {
  currency: string;  // Currency code.
  amount: number;    // Amount of money.
}

export interface ProductDetails_product_variants_edges_node_attributes_attribute {
  id: string;           // The ID of the object.
  name: string | null;  // Visible name for display purposes.
}

export interface ProductDetails_product_variants_edges_node_attributes_value {
  id: string;            // The ID of the object.
  name: string | null;   // Visible name for display purposes.
  value: string | null;  // Visible name for display purposes.
}

export interface ProductDetails_product_variants_edges_node_attributes {
  attribute: ProductDetails_product_variants_edges_node_attributes_attribute | null;  // Name of an attribute
  value: ProductDetails_product_variants_edges_node_attributes_value | null;          // Value of an attribute.
}

export interface ProductDetails_product_variants_edges_node {
  id: string;                                                                           // The ID of the object.
  name: string;
  stockQuantity: number;                                                                // Quantity of a product available for sale.
  price: ProductDetails_product_variants_edges_node_price | null;                       // Price of the product variant.
  attributes: (ProductDetails_product_variants_edges_node_attributes | null)[] | null;  // List of attributes assigned to this variant.
}

export interface ProductDetails_product_variants_edges {
  node: ProductDetails_product_variants_edges_node;  // The item at the end of the edge
}

export interface ProductDetails_product_variants {
  edges: ProductDetails_product_variants_edges[];
}

export interface ProductDetails_product {
  id: string;                                  // The ID of the object.
  name: string;
  thumbnailUrl: string | null;                 // The URL of a main thumbnail for a product.
  description: string;
  category: ProductDetails_product_category;
  price: ProductDetails_product_price | null;  // The product's base price (without any discounts         applied).
  images: ProductDetails_product_images | null;
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

export interface ProductVariantDetails_productVariant_price {
  currency: string;  // Currency code.
  amount: number;    // Amount of money.
}

export interface ProductVariantDetails_productVariant_attributes_attribute {
  id: string;           // The ID of the object.
  name: string | null;  // Visible name for display purposes.
}

export interface ProductVariantDetails_productVariant_attributes_value {
  id: string;            // The ID of the object.
  name: string | null;   // Visible name for display purposes.
  value: string | null;  // Visible name for display purposes.
}

export interface ProductVariantDetails_productVariant_attributes {
  attribute: ProductVariantDetails_productVariant_attributes_attribute | null;  // Name of an attribute
  value: ProductVariantDetails_productVariant_attributes_value | null;          // Value of an attribute.
}

export interface ProductVariantDetails_productVariant_product {
  id: string;                   // The ID of the object.
  name: string;
  thumbnailUrl: string | null;  // The URL of a main thumbnail for a product.
}

export interface ProductVariantDetails_productVariant {
  id: string;                                                                     // The ID of the object.
  name: string;
  stockQuantity: number;                                                          // Quantity of a product available for sale.
  price: ProductVariantDetails_productVariant_price | null;                       // Price of the product variant.
  attributes: (ProductVariantDetails_productVariant_attributes | null)[] | null;  // List of attributes assigned to this variant.
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
// GraphQL query operation: VariantList
// ====================================================

export interface VariantList_productVariants_edges_node_price {
  currency: string;  // Currency code.
  amount: number;    // Amount of money.
}

export interface VariantList_productVariants_edges_node_attributes_attribute {
  id: string;           // The ID of the object.
  name: string | null;  // Visible name for display purposes.
}

export interface VariantList_productVariants_edges_node_attributes_value {
  id: string;            // The ID of the object.
  name: string | null;   // Visible name for display purposes.
  value: string | null;  // Visible name for display purposes.
}

export interface VariantList_productVariants_edges_node_attributes {
  attribute: VariantList_productVariants_edges_node_attributes_attribute | null;  // Name of an attribute
  value: VariantList_productVariants_edges_node_attributes_value | null;          // Value of an attribute.
}

export interface VariantList_productVariants_edges_node_product {
  id: string;                   // The ID of the object.
  name: string;
  thumbnailUrl: string | null;  // The URL of a main thumbnail for a product.
}

export interface VariantList_productVariants_edges_node {
  id: string;                                                                       // The ID of the object.
  name: string;
  stockQuantity: number;                                                            // Quantity of a product available for sale.
  price: VariantList_productVariants_edges_node_price | null;                       // Price of the product variant.
  attributes: (VariantList_productVariants_edges_node_attributes | null)[] | null;  // List of attributes assigned to this variant.
  product: VariantList_productVariants_edges_node_product;
}

export interface VariantList_productVariants_edges {
  node: VariantList_productVariants_edges_node;  // The item at the end of the edge
}

export interface VariantList_productVariants {
  edges: VariantList_productVariants_edges[];
}

export interface VariantList {
  productVariants: VariantList_productVariants | null;  // Lookup multiple variants by ID
}

export interface VariantListVariables {
  ids?: string[] | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchResults
// ====================================================

export interface SearchResults_products_edges_node_category {
  id: string;  // The ID of the object.
  name: string;
}

export interface SearchResults_products_edges_node {
  id: string;                   // The ID of the object.
  name: string;
  thumbnailUrl: string | null;  // The URL of a main thumbnail for a product.
  url: string;                  // The storefront URL for the product.
  category: SearchResults_products_edges_node_category;
}

export interface SearchResults_products_edges {
  node: SearchResults_products_edges_node;  // The item at the end of the edge
}

export interface SearchResults_products {
  edges: SearchResults_products_edges[];
}

export interface SearchResults {
  products: SearchResults_products | null;  // List of the shop's products.
}

export interface SearchResultsVariables {
  query: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: TokenAuth
// ====================================================

export interface TokenAuth_tokenCreate_errors {
  field: string | null;    // Name of a field that caused the error. A value of         `null` indicates that the error isn't associated with a particular         field.
  message: string | null;  // The error message.
}

export interface TokenAuth_tokenCreate_user {
  id: string;  // The ID of the object.
  email: string;
  isStaff: boolean;
  note: string | null;
}

export interface TokenAuth_tokenCreate {
  token: string | null;
  errors: (TokenAuth_tokenCreate_errors | null)[] | null;
  user: TokenAuth_tokenCreate_user | null;
}

export interface TokenAuth {
  tokenCreate: TokenAuth_tokenCreate | null;
}

export interface TokenAuthVariables {
  email: string;
  password: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: VerifyToken
// ====================================================

export interface VerifyToken_tokenVerify_user {
  id: string;  // The ID of the object.
  email: string;
  isStaff: boolean;
  note: string | null;
}

export interface VerifyToken_tokenVerify {
  payload: any | null;
  user: VerifyToken_tokenVerify_user | null;
}

export interface VerifyToken {
  tokenVerify: VerifyToken_tokenVerify | null;
}

export interface VerifyTokenVariables {
  token: string;
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

// ====================================================
// GraphQL fragment: ProductVariantFields
// ====================================================

export interface ProductVariantFields_price {
  currency: string;  // Currency code.
  amount: number;    // Amount of money.
}

export interface ProductVariantFields_attributes_attribute {
  id: string;           // The ID of the object.
  name: string | null;  // Visible name for display purposes.
}

export interface ProductVariantFields_attributes_value {
  id: string;            // The ID of the object.
  name: string | null;   // Visible name for display purposes.
  value: string | null;  // Visible name for display purposes.
}

export interface ProductVariantFields_attributes {
  attribute: ProductVariantFields_attributes_attribute | null;  // Name of an attribute
  value: ProductVariantFields_attributes_value | null;          // Value of an attribute.
}

export interface ProductVariantFields {
  id: string;                                                     // The ID of the object.
  name: string;
  stockQuantity: number;                                          // Quantity of a product available for sale.
  price: ProductVariantFields_price | null;                       // Price of the product variant.
  attributes: (ProductVariantFields_attributes | null)[] | null;  // List of attributes assigned to this variant.
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: User
// ====================================================

export interface User {
  id: string;  // The ID of the object.
  email: string;
  isStaff: boolean;
  note: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

// null
export interface CheckoutCreateInput {
  lines?: (CheckoutLineInput | null)[] | null;
  email?: string | null;
  shippingAddress?: AddressInput | null;
}

// null
export interface CheckoutLineInput {
  quantity?: number | null;
  variantId?: string | null;
}

// null
export interface AddressInput {
  firstName?: string | null;
  lastName?: string | null;
  companyName?: string | null;
  streetAddress1?: string | null;
  streetAddress2?: string | null;
  city?: string | null;
  cityArea?: string | null;
  postalCode?: string | null;
  country?: string | null;
  countryArea?: string | null;
  phone?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================