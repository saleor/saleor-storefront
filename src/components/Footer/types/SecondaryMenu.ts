/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SecondaryMenu
// ====================================================

export interface SecondaryMenu_shop_navigation_secondary_items_category {
  id: string;
  name: string;
}

export interface SecondaryMenu_shop_navigation_secondary_items_collection {
  id: string;
  name: string;
}

export interface SecondaryMenu_shop_navigation_secondary_items_page {
  slug: string;
}

export interface SecondaryMenu_shop_navigation_secondary_items_children_category {
  id: string;
  name: string;
}

export interface SecondaryMenu_shop_navigation_secondary_items_children_collection {
  id: string;
  name: string;
}

export interface SecondaryMenu_shop_navigation_secondary_items_children_page {
  slug: string;
}

export interface SecondaryMenu_shop_navigation_secondary_items_children {
  id: string;
  name: string;
  category: SecondaryMenu_shop_navigation_secondary_items_children_category | null;
  url: string | null;
  collection: SecondaryMenu_shop_navigation_secondary_items_children_collection | null;
  page: SecondaryMenu_shop_navigation_secondary_items_children_page | null;
}

export interface SecondaryMenu_shop_navigation_secondary_items {
  id: string;
  name: string;
  category: SecondaryMenu_shop_navigation_secondary_items_category | null;
  url: string | null;
  collection: SecondaryMenu_shop_navigation_secondary_items_collection | null;
  page: SecondaryMenu_shop_navigation_secondary_items_page | null;
  children: (SecondaryMenu_shop_navigation_secondary_items_children | null)[] | null;
}

export interface SecondaryMenu_shop_navigation_secondary {
  items: (SecondaryMenu_shop_navigation_secondary_items | null)[] | null;
}

export interface SecondaryMenu_shop_navigation {
  secondary: SecondaryMenu_shop_navigation_secondary | null;
}

export interface SecondaryMenu_shop {
  navigation: SecondaryMenu_shop_navigation | null;
}

export interface SecondaryMenu {
  shop: SecondaryMenu_shop | null;
}
