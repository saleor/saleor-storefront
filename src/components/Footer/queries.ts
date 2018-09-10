import gql from "graphql-tag";

export const GET_COLLECTIONS = gql`
  query Collections {
    collections {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
