/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TopMenu
// ====================================================

export interface TopMenu_shop_navigation_main_items_category {
  __typename: "Category";
  id: string;
  name: string;
}

export interface TopMenu_shop_navigation_main_items_children_category {
  __typename: "Category";
  id: string;
  name: string;
}

export interface TopMenu_shop_navigation_main_items_children_children_category {
  __typename: "Category";
  id: string;
  name: string;
}

export interface TopMenu_shop_navigation_main_items_children_children {
  __typename: "MenuItem";
  id: string;
  name: string;
  category: TopMenu_shop_navigation_main_items_children_children_category | null;
  url: string | null;
  level: number;
}

export interface TopMenu_shop_navigation_main_items_children {
  __typename: "MenuItem";
  id: string;
  name: string;
  category: TopMenu_shop_navigation_main_items_children_category | null;
  url: string | null;
  level: number;
  children: (TopMenu_shop_navigation_main_items_children_children | null)[] | null;
}

export interface TopMenu_shop_navigation_main_items {
  __typename: "MenuItem";
  id: string;
  name: string;
  category: TopMenu_shop_navigation_main_items_category | null;
  url: string | null;
  level: number;
  children: (TopMenu_shop_navigation_main_items_children | null)[] | null;
}

export interface TopMenu_shop_navigation_main {
  __typename: "Menu";
  id: string;
  items: (TopMenu_shop_navigation_main_items | null)[] | null;
}

export interface TopMenu_shop_navigation {
  __typename: "Navigation";
  main: TopMenu_shop_navigation_main | null;
}

export interface TopMenu_shop {
  __typename: "Shop";
  navigation: TopMenu_shop_navigation | null;
}

export interface TopMenu {
  shop: TopMenu_shop | null;
}
