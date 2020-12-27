import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import { ProductsList } from "./gqlTypes/ProductsList";

export const homePageQuery = gql`
  query ProductsList {
    shop {
      description
      name
      homepageCollection {
        id
        backgroundImage {
          url
        }
        name
      }
    }
    categories(level: 0, first: 4) {
      edges {
        node {
          id
          name
          backgroundImage {
            url
          }
        }
      }
    }
    latest_collections: collections(
      first: 2
      filter: { published: PUBLISHED }
      sortBy: { field: PUBLICATION_DATE, direction: DESC }
    ) {
      edges {
        node {
          id
          name
          backgroundImage {
            url
          }
        }
      }
    }
    projects: collections(
      first: 3
      filter: { published: PUBLISHED, search: "Progetto:" }
      sortBy: { field: PUBLICATION_DATE, direction: ASC }
    ) {
      edges {
        node {
          id
          name
          backgroundImage {
            url
          }
        }
      }
    }
  }
`;

export const TypedHomePageQuery = TypedQuery<ProductsList, {}>(homePageQuery);
