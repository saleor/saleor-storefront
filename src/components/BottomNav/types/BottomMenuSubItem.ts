/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BottomMenuSubItem
// ====================================================

export interface BottomMenuSubItem_category {
  __typename: "Category";
  id: string;
  name: string;
}

export interface BottomMenuSubItem_collection {
  __typename: "Collection";
  id: string;
  name: string;
}

export interface BottomMenuSubItem_page {
  __typename: "Page";
  slug: string;
}

export interface BottomMenuSubItem {
  __typename: "MenuItem";
  id: string;
  name: string;
  category: BottomMenuSubItem_category | null;
  url: string | null;
  collection: BottomMenuSubItem_collection | null;
  page: BottomMenuSubItem_page | null;
}
