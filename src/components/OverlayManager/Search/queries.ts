import gql from "graphql-tag";

import { TypedQuery } from "../../../core/queries";
import {
  SearchResults,
  SearchResultsVariables,
} from "./gqlTypes/SearchResults";

const searchResultsQuery = gql`
  query SearchResults($query: String!) {
    collections(filter: { search: $query, published: PUBLISHED }, first: 5) {
      edges {
        node {
          id
          name
          backgroundImage {
            url
            alt
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
    categories(filter: { search: $query }, first: 5) {
      edges {
        node {
          id
          name
          backgroundImage {
            url
            alt
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
    products(filter: { search: $query, isPublished: true }, first: 15) {
      edges {
        node {
          id
          name
          thumbnail {
            url
            alt
          }
          thumbnail2x: thumbnail(size: 510) {
            url
          }
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

export const TypedSearchResults = TypedQuery<
  SearchResults,
  SearchResultsVariables
>(searchResultsQuery);
