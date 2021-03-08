/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Category
// ====================================================

export interface Category_category_backgroundImage {
  __typename: "Image";
  url: string;
}

export interface Category_category_ancestors_edges_node {
  __typename: "Category";
  id: string;
  name: string;
}

export interface Category_category_ancestors_edges {
  __typename: "CategoryCountableEdge";
  node: Category_category_ancestors_edges_node;
}

export interface Category_category_ancestors {
  __typename: "CategoryCountableConnection";
  edges: Category_category_ancestors_edges[];
}

export interface Category_category {
  __typename: "Category";
  seoDescription: string | null;
  seoTitle: string | null;
  id: string;
  name: string;
  backgroundImage: Category_category_backgroundImage | null;
  ancestors: Category_category_ancestors | null;
}

export interface Category_attributes_edges_node_values {
  __typename: "AttributeValue";
  id: string;
  name: string | null;
  slug: string | null;
}

export interface Category_attributes_edges_node {
  __typename: "Attribute";
  id: string;
  name: string | null;
  slug: string | null;
  values: (Category_attributes_edges_node_values | null)[] | null;
}

export interface Category_attributes_edges {
  __typename: "AttributeCountableEdge";
  node: Category_attributes_edges_node;
}

export interface Category_attributes {
  __typename: "AttributeCountableConnection";
  edges: Category_attributes_edges[];
}

export interface Category {
  category: Category_category | null;
  attributes: Category_attributes | null;
}

export interface CategoryVariables {
  id: string;
  channel?: string | null;
}
