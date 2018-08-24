import gql from "graphql-tag";

export const GET_PRODUCTS_AND_CATEGORIES = gql`
  {
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
        }
      }
    }
  }  
`;