import gql from "graphql-tag";

export const GET_SEARCH_RESULTS = gql`
  query SearchResults($query: String!) {
    products(query: $query) {
      edges {
        node {
          id
          name
          thumbnailUrl
          url
          category {
            name
          }
        }
      }
    }
  }
`;
