import gql from "graphql-tag";

export const GET_SEARCH_RESULTS = gql`
  query SearchResults($query: String!) {
    products(query: $query, first: 20) {
      edges {
        node {
          id
          name
          thumbnailUrl
          url
          category {
            id
            name
          }
        }
      }
    }
  }
`;
