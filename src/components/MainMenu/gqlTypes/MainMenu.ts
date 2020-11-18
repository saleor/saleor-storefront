/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MainMenu
// ====================================================

export interface MainMenu_menu_items_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface MainMenu_menu_items_collection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface MainMenu_menu_items_page {
  __typename: "Page";
  slug: string;
}

export interface MainMenu_menu_items_parent {
  __typename: "MenuItem";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface MainMenu_menu_items_children_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface MainMenu_menu_items_children_collection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface MainMenu_menu_items_children_page {
  __typename: "Page";
  slug: string;
}

export interface MainMenu_menu_items_children_parent {
  __typename: "MenuItem";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface MainMenu_menu_items_children_children_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface MainMenu_menu_items_children_children_collection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface MainMenu_menu_items_children_children_page {
  __typename: "Page";
  slug: string;
}

export interface MainMenu_menu_items_children_children_parent {
  __typename: "MenuItem";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface MainMenu_menu_items_children_children {
  __typename: "MenuItem";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: MainMenu_menu_items_children_children_category | null;
  /**
   * URL to the menu item.
   */
  url: string | null;
  collection: MainMenu_menu_items_children_children_collection | null;
  page: MainMenu_menu_items_children_children_page | null;
  parent: MainMenu_menu_items_children_children_parent | null;
}

export interface MainMenu_menu_items_children {
  __typename: "MenuItem";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: MainMenu_menu_items_children_category | null;
  /**
   * URL to the menu item.
   */
  url: string | null;
  collection: MainMenu_menu_items_children_collection | null;
  page: MainMenu_menu_items_children_page | null;
  parent: MainMenu_menu_items_children_parent | null;
  children: (MainMenu_menu_items_children_children | null)[] | null;
}

export interface MainMenu_menu_items {
  __typename: "MenuItem";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: MainMenu_menu_items_category | null;
  /**
   * URL to the menu item.
   */
  url: string | null;
  collection: MainMenu_menu_items_collection | null;
  page: MainMenu_menu_items_page | null;
  parent: MainMenu_menu_items_parent | null;
  children: (MainMenu_menu_items_children | null)[] | null;
}

export interface MainMenu_menu {
  __typename: "Menu";
  /**
   * The ID of the object.
   */
  id: string;
  items: (MainMenu_menu_items | null)[] | null;
}

export interface MainMenu {
  /**
   * Look up a navigation menu by ID or name.
   */
  menu: MainMenu_menu | null;
}

export interface MainMenuVariables {
  channel: string;
  slug: string;
}
