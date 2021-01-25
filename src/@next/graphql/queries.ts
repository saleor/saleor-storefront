import gql from "graphql-tag";

import { attributeFragment, featuredProductsFragment } from "./fragments";

export const featuredProductsQuery = gql`
  ${featuredProductsFragment}
  query FeaturedProductsQuery($channel: String!) {
    ...FeaturedProducts
  }
`;

export const shopAttributesQuery = gql`
  ${attributeFragment}
  query ShopAttributesQuery(
    $channel: String!
    $collectionId: ID
    $categoryId: ID
  ) {
    attributes(
      filter: {
        channel: $channel
        inCollection: $collectionId
        inCategory: $categoryId
        filterableInStorefront: true
      }
      first: 100
    ) {
      edges {
        node {
          ...Attribute
        }
      }
    }
  }
`;
