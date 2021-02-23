/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SecondaryMenu
// ====================================================

export interface SecondaryMenu_menu_items_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface SecondaryMenu_menu_items_collection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface SecondaryMenu_menu_items_page {
  __typename: "Page";
  slug: string;
}

export interface SecondaryMenu_menu_items_children_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface SecondaryMenu_menu_items_children_collection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface SecondaryMenu_menu_items_children_page {
  __typename: "Page";
  slug: string;
}

export interface SecondaryMenu_menu_items_children {
  __typename: "MenuItem";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: SecondaryMenu_menu_items_children_category | null;
  /**
   * URL to the menu item.
   */
  url: string | null;
  collection: SecondaryMenu_menu_items_children_collection | null;
  page: SecondaryMenu_menu_items_children_page | null;
}

export interface SecondaryMenu_menu_items {
  __typename: "MenuItem";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: SecondaryMenu_menu_items_category | null;
  /**
   * URL to the menu item.
   */
  url: string | null;
  collection: SecondaryMenu_menu_items_collection | null;
  page: SecondaryMenu_menu_items_page | null;
  children: (SecondaryMenu_menu_items_children | null)[] | null;
}

export interface SecondaryMenu_menu {
  __typename: "Menu";
  items: (SecondaryMenu_menu_items | null)[] | null;
}

export interface SecondaryMenu {
  /**
   * Look up a navigation menu by ID or name.
   */
  menu: SecondaryMenu_menu | null;
}

export interface SecondaryMenuVariables {
  channel: string;
  slug: string;
}
