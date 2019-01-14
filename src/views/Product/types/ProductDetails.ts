/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductDetails
// ====================================================

export interface ProductDetails_product_thumbnail {
  url: string;
  alt: string | null;
}

export interface ProductDetails_product_thumbnail2x {
  url: string;
}

export interface ProductDetails_product_category_products_edges_node_thumbnail {
  url: string;
  alt: string | null;
}

export interface ProductDetails_product_category_products_edges_node_thumbnail2x {
  url: string;
}

export interface ProductDetails_product_category_products_edges_node_category {
  id: string;
  name: string;
}

export interface ProductDetails_product_category_products_edges_node_price {
  amount: number;
  currency: string;
  localized: string;
}

export interface ProductDetails_product_category_products_edges_node {
  id: string;
  name: string;
  thumbnail: ProductDetails_product_category_products_edges_node_thumbnail | null;
  thumbnail2x: ProductDetails_product_category_products_edges_node_thumbnail2x | null;
  category: ProductDetails_product_category_products_edges_node_category;
  price: ProductDetails_product_category_products_edges_node_price | null;
}

export interface ProductDetails_product_category_products_edges {
  node: ProductDetails_product_category_products_edges_node;
}

export interface ProductDetails_product_category_products {
  edges: ProductDetails_product_category_products_edges[];
}

export interface ProductDetails_product_category {
  id: string;
  name: string;
  products: ProductDetails_product_category_products | null;
}

export interface ProductDetails_product_price {
  amount: number;
  currency: string;
  localized: string;
}

export interface ProductDetails_product_images {
  id: string;
  url: string;
}

export interface ProductDetails_product_variants_price {
  currency: string;
  amount: number;
  localized: string;
}

export interface ProductDetails_product_variants_attributes_attribute {
  id: string;
  name: string | null;
}

export interface ProductDetails_product_variants_attributes_value {
  id: string;
  name: string | null;
  value: string | null;
}

export interface ProductDetails_product_variants_attributes {
  attribute: ProductDetails_product_variants_attributes_attribute;
  value: ProductDetails_product_variants_attributes_value;
}

export interface ProductDetails_product_variants {
  id: string;
  name: string;
  stockQuantity: number;
  price: ProductDetails_product_variants_price | null;
  attributes: ProductDetails_product_variants_attributes[];
}

export interface ProductDetails_product_availability {
  available: boolean | null;
}

export interface ProductDetails_product {
  id: string;
  name: string;
  thumbnail: ProductDetails_product_thumbnail | null;
  thumbnail2x: ProductDetails_product_thumbnail2x | null;
  description: string;
  category: ProductDetails_product_category;
  price: ProductDetails_product_price | null;
  images: (ProductDetails_product_images | null)[] | null;
  variants: (ProductDetails_product_variants | null)[] | null;
  seoDescription: string | null;
  seoTitle: string | null;
  availability: ProductDetails_product_availability | null;
}

export interface ProductDetails {
  product: ProductDetails_product | null;
}

export interface ProductDetailsVariables {
  id: string;
}
