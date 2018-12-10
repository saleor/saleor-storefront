/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MainMenuSubItem
// ====================================================

export interface MainMenuSubItem_category {
  __typename: "Category";
  id: string;
  name: string;
}

export interface MainMenuSubItem_collection {
  __typename: "Collection";
  id: string;
  name: string;
}

export interface MainMenuSubItem_page {
  __typename: "Page";
  slug: string;
}

export interface MainMenuSubItem {
  __typename: "MenuItem";
  id: string;
  name: string;
  category: MainMenuSubItem_category | null;
  url: string | null;
  collection: MainMenuSubItem_collection | null;
  page: MainMenuSubItem_page | null;
}
