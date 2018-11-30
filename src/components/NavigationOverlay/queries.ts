import gql from "graphql-tag";

export const GET_CATEGORIES = gql`
  query Categories($level: Int) {
    categories(level: $level, first: 20) {
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
