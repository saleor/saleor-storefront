/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Article
// ====================================================

export interface Article_page {
  __typename: "Page";
  contentJson: any;
  id: string;
  seoDescription: string | null;
  seoTitle: string | null;
  slug: string;
  title: string;
}

export interface Article_collection_backgroundImage {
  __typename: "Image";
  url: string;
}

export interface Article_collection {
  __typename: "Collection";
  id: string;
  backgroundImage: Article_collection_backgroundImage | null;
}

export interface Article {
  page: Article_page | null;
  collection: Article_collection | null;
}

export interface ArticleVariables {
  slug: string;
  channel?: string | null;
}
