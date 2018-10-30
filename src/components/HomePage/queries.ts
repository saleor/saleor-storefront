import gql from "graphql-tag";

export const GET_PRODUCTS_AND_CATEGORIES = gql`
  query ProductsList {
    shop {
      homepageCollection {
        id
        backgroundImage {
          url
        }
        products {
          edges {
            node {
              id
              name
              thumbnailUrl
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
