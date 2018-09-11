import gql from "graphql-tag";

export const GET_PRODUCTS_AND_CATEGORIES = gql`
  query ProductsList {
    products(first: 10) {
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
