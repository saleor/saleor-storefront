/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Pages
// ====================================================

export interface Pages_pages_edges_node {
  __typename: "Page";
  /**
   * The ID of the object.
   */
  id: string;
  slug: string;
}

export interface Pages_pages_edges {
  __typename: "PageCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: Pages_pages_edges_node;
}

export interface Pages_pages {
  __typename: "PageCountableConnection";
  edges: Pages_pages_edges[];
}

export interface Pages {
  /**
   * List of the shop's pages.
   */
  pages: Pages_pages | null;
}
