/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductNameTranslationFields
// ====================================================

export interface ProductNameTranslationFields_translation {
  __typename: "ProductTranslation";
  name: string;
  descriptionJson: any;
  seoDescription: string | null;
  seoTitle: string | null;
}

export interface ProductNameTranslationFields {
  __typename: "Product";
  /**
   * Returns translated product fields for the given language code.
   */
  translation: ProductNameTranslationFields_translation | null;
}
