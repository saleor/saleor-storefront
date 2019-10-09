import gql from "graphql-tag";

export const attributes = gql`
  query Attributes($id: ID!) {
    attributes(inCategory: $id, first: 100) {
      edges {
        node {
          id
          name
          slug
          values {
            id
            name
            slug
          }
        }
      }
    }
  }
`;
