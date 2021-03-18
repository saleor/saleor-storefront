/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MenuItem
// ====================================================

export interface MenuItem_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface MenuItem_collection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface MenuItem_page {
  __typename: "Page";
  slug: string;
}

export interface MenuItem_parent {
  __typename: "MenuItem";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface MenuItem {
  __typename: "MenuItem";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: MenuItem_category | null;
  /**
   * URL to the menu item.
   */
  url: string | null;
  collection: MenuItem_collection | null;
  page: MenuItem_page | null;
  parent: MenuItem_parent | null;
}
