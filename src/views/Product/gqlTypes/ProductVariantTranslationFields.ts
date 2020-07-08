/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductVariantTranslationFields
// ====================================================

export interface ProductVariantTranslationFields_translation {
  __typename: "ProductVariantTranslation";
  name: string;
}

export interface ProductVariantTranslationFields {
  __typename: "ProductVariant";
  /**
   * Returns translated product variant fields for the given language code.
   */
  translation: ProductVariantTranslationFields_translation | null;
}
