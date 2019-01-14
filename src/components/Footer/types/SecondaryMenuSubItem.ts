/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SecondaryMenuSubItem
// ====================================================

export interface SecondaryMenuSubItem_category {
  id: string;
  name: string;
}

export interface SecondaryMenuSubItem_collection {
  id: string;
  name: string;
}

export interface SecondaryMenuSubItem_page {
  slug: string;
}

export interface SecondaryMenuSubItem {
  id: string;
  name: string;
  category: SecondaryMenuSubItem_category | null;
  url: string | null;
  collection: SecondaryMenuSubItem_collection | null;
  page: SecondaryMenuSubItem_page | null;
}
