/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CategoryDetails
// ====================================================

export interface CategoryDetails_category_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface CategoryDetails_category_ancestors_edges_node {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface CategoryDetails_category_ancestors_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: CategoryDetails_category_ancestors_edges_node;
}

export interface CategoryDetails_category_ancestors {
  __typename: "CategoryCountableConnection";
  edges: CategoryDetails_category_ancestors_edges[];
}

export interface CategoryDetails_category {
  __typename: "Category";
  seoDescription: string | null;
  seoTitle: string | null;
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  backgroundImage: CategoryDetails_category_backgroundImage | null;
  /**
   * List of ancestors of the category.
   */
  ancestors: CategoryDetails_category_ancestors | null;
}

export interface CategoryDetails {
  /**
   * Look up a category by ID or slug.
   */
  category: CategoryDetails_category | null;
}

export interface CategoryDetailsVariables {
  id: string;
}
