import gql from "graphql-tag";

export const GET_FEATURED_PRODUCTS = gql`
  query ProductsList {
    shop {
      homepageCollection {
        id
        products(first: 20) {
          edges {
            node {
              id
              name
              thumbnailUrl
              thumbnailUrl2x: thumbnailUrl(size: 510)
              category {
                id
                name
              }
              price {
                currency
                amount
                localized
              }
            }
          }
        }
      }
    }
  }
`;
