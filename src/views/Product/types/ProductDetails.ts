/* tslint:disable */
// This file was automatically generated and should not be edited.

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

export interface ProductDetails_product_category_products_edges_node_thumbnail {
  __typename: "Image";
  url: string;
  alt: string | null;
}

export interface ProductDetails_product_category_products_edges_node_thumbnail2x {
  __typename: "Image";
  url: string;
}

export interface ProductDetails_product_category_products_edges_node_category {
  __typename: "Category";
  id: string;
  name: string;
}

export interface ProductDetails_product_category_products_edges_node_price {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface ProductDetails_product_category_products_edges_node {
  __typename: "Product";
  id: string;
  name: string;
  thumbnail: ProductDetails_product_category_products_edges_node_thumbnail | null;
  thumbnail2x: ProductDetails_product_category_products_edges_node_thumbnail2x | null;
  category: ProductDetails_product_category_products_edges_node_category;
  price: ProductDetails_product_category_products_edges_node_price | null;
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

export interface ProductDetails_product_price {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface ProductDetails_product_images {
  __typename: "ProductImage";
  id: string;
  url: string;
}

export interface ProductDetails_product_variants_price {
  __typename: "Money";
  currency: string;
  amount: number;
  localized: string;
}

export interface ProductDetails_product_variants_attributes_attribute {
  __typename: "Attribute";
  id: string;
  name: string | null;
}

export interface ProductDetails_product_variants_attributes_value {
  __typename: "AttributeValue";
  id: string;
  name: string | null;
  value: string | null;
}

export interface ProductDetails_product_variants_attributes {
  __typename: "SelectedAttribute";
  attribute: ProductDetails_product_variants_attributes_attribute;
  value: ProductDetails_product_variants_attributes_value;
}

export interface ProductDetails_product_variants {
  __typename: "ProductVariant";
  id: string;
  name: string;
  stockQuantity: number;
  price: ProductDetails_product_variants_price | null;
  attributes: ProductDetails_product_variants_attributes[];
}

export interface ProductDetails_product_availability {
  __typename: "ProductAvailability";
  available: boolean | null;
}

export interface ProductDetails_product {
  __typename: "Product";
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
