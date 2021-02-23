import gql from "graphql-tag";

import { featuredProductsFragment } from "@graphql";

export const homePageProductsQuery = gql`
  ${featuredProductsFragment}
  query HomePageProducts($channel: String) {
    shop {
      description
      name
    }
    ...FeaturedProducts
    categories(level: 0, first: 4) {
      edges {
        node {
          id
          name
          slug
          backgroundImage {
            url
          }
        }
      }
    }
  }
`;
