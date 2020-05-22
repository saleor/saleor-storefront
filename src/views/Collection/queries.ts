import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import {
  basicProductFragment,
  productPricingFragment,
} from "../Product/queries";
import { Collection, CollectionVariables } from "./gqlTypes/Collection";

export const collectionProductsQuery = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  query Collection(
    $id: ID!
    $attributes: [AttributeInput]
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
      seoDescription
      seoTitle
      backgroundImage {
        url
      }
    }
    products(
      after: $after
      first: $pageSize
      sortBy: $sortBy
      filter: {
        attributes: $attributes
        collections: [$id]
        minimalPrice: { gte: $priceGte, lte: $priceLte }
      }
    ) {
      totalCount
      edges {
        node {
          ...BasicProductFields
          ...ProductPricingField
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
    attributes(filter: { inCollection: $id }, first: 100) {
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
>(collectionProductsQuery);
