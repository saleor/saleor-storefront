import gql from "graphql-tag";

export const GET_CATEGORIES = gql`
  query Categories {
    categories {
      edges {
        node {
          id
          name
          url
        }
      }
    }
  }
`;
