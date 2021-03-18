/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ShopMenusQuery
// ====================================================

export interface ShopMenusQuery_footer_items_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface ShopMenusQuery_footer_items_collection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface ShopMenusQuery_footer_items_page {
  __typename: "Page";
  slug: string;
}

export interface ShopMenusQuery_footer_items_parent {
  __typename: "MenuItem";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface ShopMenusQuery_footer_items_children_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface ShopMenusQuery_footer_items_children_collection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface ShopMenusQuery_footer_items_children_page {
  __typename: "Page";
  slug: string;
}

export interface ShopMenusQuery_footer_items_children_parent {
  __typename: "MenuItem";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface ShopMenusQuery_footer_items_children {
  __typename: "MenuItem";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: ShopMenusQuery_footer_items_children_category | null;
  /**
   * URL to the menu item.
   */
  url: string | null;
  collection: ShopMenusQuery_footer_items_children_collection | null;
  page: ShopMenusQuery_footer_items_children_page | null;
  parent: ShopMenusQuery_footer_items_children_parent | null;
}

export interface ShopMenusQuery_footer_items {
  __typename: "MenuItem";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: ShopMenusQuery_footer_items_category | null;
  /**
   * URL to the menu item.
   */
  url: string | null;
  collection: ShopMenusQuery_footer_items_collection | null;
  page: ShopMenusQuery_footer_items_page | null;
  parent: ShopMenusQuery_footer_items_parent | null;
  children: (ShopMenusQuery_footer_items_children | null)[] | null;
}

export interface ShopMenusQuery_footer {
  __typename: "Menu";
  /**
   * The ID of the object.
   */
  id: string;
  items: (ShopMenusQuery_footer_items | null)[] | null;
}

export interface ShopMenusQuery_mainMenu_items_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface ShopMenusQuery_mainMenu_items_collection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface ShopMenusQuery_mainMenu_items_page {
  __typename: "Page";
  slug: string;
}

export interface ShopMenusQuery_mainMenu_items_parent {
  __typename: "MenuItem";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface ShopMenusQuery_mainMenu_items_children_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface ShopMenusQuery_mainMenu_items_children_collection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface ShopMenusQuery_mainMenu_items_children_page {
  __typename: "Page";
  slug: string;
}

export interface ShopMenusQuery_mainMenu_items_children_parent {
  __typename: "MenuItem";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface ShopMenusQuery_mainMenu_items_children_children_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface ShopMenusQuery_mainMenu_items_children_children_collection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface ShopMenusQuery_mainMenu_items_children_children_page {
  __typename: "Page";
  slug: string;
}

export interface ShopMenusQuery_mainMenu_items_children_children_parent {
  __typename: "MenuItem";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface ShopMenusQuery_mainMenu_items_children_children {
  __typename: "MenuItem";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: ShopMenusQuery_mainMenu_items_children_children_category | null;
  /**
   * URL to the menu item.
   */
  url: string | null;
  collection: ShopMenusQuery_mainMenu_items_children_children_collection | null;
  page: ShopMenusQuery_mainMenu_items_children_children_page | null;
  parent: ShopMenusQuery_mainMenu_items_children_children_parent | null;
}

export interface ShopMenusQuery_mainMenu_items_children {
  __typename: "MenuItem";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: ShopMenusQuery_mainMenu_items_children_category | null;
  /**
   * URL to the menu item.
   */
  url: string | null;
  collection: ShopMenusQuery_mainMenu_items_children_collection | null;
  page: ShopMenusQuery_mainMenu_items_children_page | null;
  parent: ShopMenusQuery_mainMenu_items_children_parent | null;
  children: (ShopMenusQuery_mainMenu_items_children_children | null)[] | null;
}

export interface ShopMenusQuery_mainMenu_items {
  __typename: "MenuItem";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: ShopMenusQuery_mainMenu_items_category | null;
  /**
   * URL to the menu item.
   */
  url: string | null;
  collection: ShopMenusQuery_mainMenu_items_collection | null;
  page: ShopMenusQuery_mainMenu_items_page | null;
  parent: ShopMenusQuery_mainMenu_items_parent | null;
  children: (ShopMenusQuery_mainMenu_items_children | null)[] | null;
}

export interface ShopMenusQuery_mainMenu {
  __typename: "Menu";
  items: (ShopMenusQuery_mainMenu_items | null)[] | null;
}

export interface ShopMenusQuery {
  /**
   * Look up a navigation menu by ID or name.
   */
  footer: ShopMenusQuery_footer | null;
  /**
   * Look up a navigation menu by ID or name.
   */
  mainMenu: ShopMenusQuery_mainMenu | null;
}

export interface ShopMenusQueryVariables {
  channel: string;
  footerSlug: string;
  mainMenuSlug: string;
}
