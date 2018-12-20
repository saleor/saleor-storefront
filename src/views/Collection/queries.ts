import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import { Collection, CollectionVariables } from "./types/Collection";

export const callectionPoroductsQuery = gql`
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
      categories: [$id]
      first: $pageSize
      sortBy: $sortBy
      priceLte: $priceLte
      priceGte: $priceGte
    ) {
      totalCount
      edges {
        node {
          id
          name
          thumbnailUrl
          thumbnailUrl2x: thumbnailUrl(size: 510)
          thumbnail {
            url
          }
          collections {
            id
            name
          }
          price {
            amount
            currency
            localized
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
