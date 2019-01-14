/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Article
// ====================================================

export interface Article_page {
  content: string;
  id: string;
  seoDescription: string | null;
  seoTitle: string | null;
  slug: string;
  title: string;
}

export interface Article_shop_homepageCollection_backgroundImage {
  url: string;
}

export interface Article_shop_homepageCollection {
  id: string;
  backgroundImage: Article_shop_homepageCollection_backgroundImage | null;
}

export interface Article_shop {
  homepageCollection: Article_shop_homepageCollection | null;
}

export interface Article {
  page: Article_page | null;
  shop: Article_shop | null;
}

export interface ArticleVariables {
  slug: string;
}
