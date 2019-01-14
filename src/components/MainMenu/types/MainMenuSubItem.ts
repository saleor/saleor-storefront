/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MainMenuSubItem
// ====================================================

export interface MainMenuSubItem_category {
  id: string;
  name: string;
}

export interface MainMenuSubItem_collection {
  id: string;
  name: string;
}

export interface MainMenuSubItem_page {
  slug: string;
}

export interface MainMenuSubItem_parent {
  id: string;
}

export interface MainMenuSubItem {
  id: string;
  name: string;
  category: MainMenuSubItem_category | null;
  url: string | null;
  collection: MainMenuSubItem_collection | null;
  page: MainMenuSubItem_page | null;
  parent: MainMenuSubItem_parent | null;
}
