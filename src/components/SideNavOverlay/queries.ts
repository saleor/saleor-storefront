import gql from "graphql-tag";

export const GET_CATEGORIES = gql`
  fragment SubCategory on Category {
    id
    url
    name
  }

  query Categories($level: Int, $first: Int = 20) {
    categories(level: $level, first: $first) {
      edges {
        node {
          ...SubCategory
        }
      }
    }
  }
`;
