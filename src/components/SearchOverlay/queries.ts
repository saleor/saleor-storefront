import gql from "graphql-tag";

export const GET_SEARCH_RESULTS = gql`
  query SearchResults($query: String!) {
    products(query: $query, first: 20) {
      edges {
        node {
          id
          name
          thumbnail(size: 510){
            url
            alt
          }
          url
          category {
            id
            name
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;
