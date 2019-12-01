import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import { ProductsList } from "./types/ProductsList";

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
    collections(query: "f", first: 3, filter: {published: PUBLISHED}) {
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
    projects: collections(query: "Project", first: 2) {
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
