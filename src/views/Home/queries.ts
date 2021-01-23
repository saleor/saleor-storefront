import gql from "graphql-tag";

import { featuredProductFragment } from "@temp/components/ProductsFeatured/queries";

export const homePageProductsQuery = gql`
  ${featuredProductFragment}
  query HomePageProducts($channel: String) {
    shop {
      description
      name
    }
    collection(slug: "featured-products", channel: $channel) {
      name
      backgroundImage {
        url
        alt
      }
      products(first: 20) {
        edges {
          node {
            ...FeaturedProduct
          }
        }
      }
    }
    categories(level: 0, first: 4) {
      edges {
        node {
          id
          name
          backgroundImage {
            url
          }
        }
      }
    }
  }
`;
