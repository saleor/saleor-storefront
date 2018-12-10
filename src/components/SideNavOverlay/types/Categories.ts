/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Categories
// ====================================================

export interface Categories_categories_edges_node {
  __typename: "Category";
  id: string;
  url: string | null;
  name: string;
}

export interface Categories_categories_edges {
  __typename: "CategoryCountableEdge";
  node: Categories_categories_edges_node;
}

export interface Categories_categories {
  __typename: "CategoryCountableConnection";
  edges: Categories_categories_edges[];
}

export interface Categories {
  categories: Categories_categories | null;
}

export interface CategoriesVariables {
  level?: number | null;
  first?: number | null;
}
