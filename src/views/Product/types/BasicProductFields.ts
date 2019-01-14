/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BasicProductFields
// ====================================================

export interface BasicProductFields_thumbnail {
  url: string;
  alt: string | null;
}

export interface BasicProductFields_thumbnail2x {
  url: string;
}

export interface BasicProductFields {
  id: string;
  name: string;
  thumbnail: BasicProductFields_thumbnail | null;
  thumbnail2x: BasicProductFields_thumbnail2x | null;
}
