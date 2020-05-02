import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import { Collection, CollectionVariables } from "../Collection/types/Collection";

export const getCollectionBySlug = gql`
  query Collection($id: ID!){
    collection(id: $id) {
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
`;

export const TypedCollectionSlugQuery = TypedQuery<Collection,
  CollectionVariables>(getCollectionBySlug);
