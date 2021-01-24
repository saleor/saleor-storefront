import gql from "graphql-tag";

import { featuredProductsFragment } from "./fragments";

export const featuredProductsQuery = gql`
  ${featuredProductsFragment}
  query FeaturedProductsQuery($channel: String!) {
    ...FeaturedProducts
  }
`;
