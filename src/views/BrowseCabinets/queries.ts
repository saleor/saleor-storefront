import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import { Collection, CollectionVariables } from "../Collection/types/Collection";

export const getCollectionQuery = gql`
  query {
    collections(first: 20) {
      edges{
        node{
          id
          name
          description
          slug
          backgroundImage{
            alt
            url
          }
        }
      }
    }
  }
`;

export const TypedCollectionQuery = TypedQuery<Collection,
  CollectionVariables>(getCollectionQuery);
