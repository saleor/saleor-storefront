import gql from "graphql-tag";

export const GET_COLLECTIONS = gql`
  query Collections($first: Int) {
    collections(first: $first) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
