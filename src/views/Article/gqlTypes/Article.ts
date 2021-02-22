/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Article
// ====================================================

export interface Article_page {
  __typename: "Page";
  content: any | null;
  /**
   * The ID of the object.
   */
  id: string;
  seoDescription: string | null;
  seoTitle: string | null;
  slug: string;
  title: string;
}

export interface Article_collection_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface Article_collection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  backgroundImage: Article_collection_backgroundImage | null;
}

export interface Article {
  /**
   * Look up a page by ID or slug.
   */
  page: Article_page | null;
  /**
   * Look up a collection by ID.
   */
  collection: Article_collection | null;
}

export interface ArticleVariables {
  slug: string;
  channel?: string | null;
}
