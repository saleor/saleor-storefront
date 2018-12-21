/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BasicProductFields
// ====================================================

export interface BasicProductFields_thumbnail {
  __typename: "Image";
  url: string;
  alt: string | null;
}

export interface BasicProductFields {
  __typename: "Product";
  id: string;
  name: string;
  thumbnail: BasicProductFields_thumbnail | null;
}
