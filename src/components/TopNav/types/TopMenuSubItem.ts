/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TopMenuSubItem
// ====================================================

export interface TopMenuSubItem_category {
  __typename: "Category";
  id: string;
  name: string;
}

export interface TopMenuSubItem {
  __typename: "MenuItem";
  id: string;
  name: string;
  category: TopMenuSubItem_category | null;
  url: string | null;
  level: number;
}
