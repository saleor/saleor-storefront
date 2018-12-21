import gql from "graphql-tag";

import { productNodeFragment } from "../../components/ProductListItem/queries";
import { TypedQuery } from "../../core/queries";
import { Collection, CollectionVariables } from "./types/Collection";

export const callectionPoroductsQuery = gql`
  ${productNodeFragment}
  query Collection(
    $id: ID!
    $attributes: [AttributeScalar]
    $after: String
    $pageSize: Int
    $sortBy: ProductOrder
    $priceLte: Float
    $priceGte: Float
  ) {
    collection(id: $id) {
      id
      slug
      name
      backgroundImage {
        url
      }
    }
    products(
      collections: [$id]
      after: $after
      attributes: $attributes
      first: $pageSize
      sortBy: $sortBy
      priceLte: $priceLte
      priceGte: $priceGte
    ) {
      totalCount
      edges {
        node {
          ...ProductNodeFragment
          collections {
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
    # attributes(inCollection: $id, first: 100) {
    # TODO change after merge
    attributes(inCategory: $id, first: 100) {
      edges {
        node {
          id
          name
          slug
          values {
            id
            name
            slug
          }
        }
      }
    }
  }
`;

export const TypedCollectionProductsQuery = TypedQuery<
  Collection,
  CollectionVariables
>(callectionPoroductsQuery);
