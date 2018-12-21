import gql from "graphql-tag";

export const productNodeFragment = gql`
  fragment ProductNodeFragment on Product {
    id
    name
    thumbnailUrl
    thumbnailUrl2x: thumbnailUrl(size: 510)
    price {
      amount
      currency
      localized
    }
  }
`;
