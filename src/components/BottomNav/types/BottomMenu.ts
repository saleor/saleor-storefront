/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BottomMenu
// ====================================================

export interface BottomMenu_shop_navigation_secondary_items_category {
  __typename: "Category";
  id: string;
  name: string;
}

export interface BottomMenu_shop_navigation_secondary_items_collection {
  __typename: "Collection";
  id: string;
  name: string;
}

export interface BottomMenu_shop_navigation_secondary_items_page {
  __typename: "Page";
  slug: string;
}

export interface BottomMenu_shop_navigation_secondary_items_children_category {
  __typename: "Category";
  id: string;
  name: string;
}

export interface BottomMenu_shop_navigation_secondary_items_children_collection {
  __typename: "Collection";
  id: string;
  name: string;
}

export interface BottomMenu_shop_navigation_secondary_items_children_page {
  __typename: "Page";
  slug: string;
}

export interface BottomMenu_shop_navigation_secondary_items_children {
  __typename: "MenuItem";
  id: string;
  name: string;
  category: BottomMenu_shop_navigation_secondary_items_children_category | null;
  url: string | null;
  collection: BottomMenu_shop_navigation_secondary_items_children_collection | null;
  page: BottomMenu_shop_navigation_secondary_items_children_page | null;
}

export interface BottomMenu_shop_navigation_secondary_items {
  __typename: "MenuItem";
  id: string;
  name: string;
  category: BottomMenu_shop_navigation_secondary_items_category | null;
  url: string | null;
  collection: BottomMenu_shop_navigation_secondary_items_collection | null;
  page: BottomMenu_shop_navigation_secondary_items_page | null;
  children: (BottomMenu_shop_navigation_secondary_items_children | null)[] | null;
}

export interface BottomMenu_shop_navigation_secondary {
  __typename: "Menu";
  items: (BottomMenu_shop_navigation_secondary_items | null)[] | null;
}

export interface BottomMenu_shop_navigation {
  __typename: "Navigation";
  secondary: BottomMenu_shop_navigation_secondary | null;
}

export interface BottomMenu_shop {
  __typename: "Shop";
  navigation: BottomMenu_shop_navigation | null;
}

export interface BottomMenu {
  shop: BottomMenu_shop | null;
}
