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
