import gql from "graphql-tag";

export const GET_PRODUCTS_AND_CATEGORIES = gql`
  query ProductsList {
    shop {
      homepageCollection {
        id
        backgroundImage {
          url
        }
        name
        products {
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
    categories {
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
