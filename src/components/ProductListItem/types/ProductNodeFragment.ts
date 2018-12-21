/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductNodeFragment
// ====================================================

export interface ProductNodeFragment_price {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface ProductNodeFragment {
  __typename: "Product";
  id: string;
  name: string;
  thumbnailUrl: string | null;
  thumbnailUrl2x: string | null;
  price: ProductNodeFragment_price | null;
}
