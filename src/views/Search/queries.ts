import gql from "graphql-tag";

import { attributeFragment, productPricingFragment } from "@graphql";

import { TypedQuery } from "../../core/queries";
import {
  SearchProducts,
  SearchProductsVariables,
} from "./gqlTypes/SearchProducts";

export const searchProductsQuery = gql`
  ${productPricingFragment}
  ${attributeFragment}
  query SearchProducts(
    $query: String!
    $channel: String!
    $attributes: [AttributeInput]
    $pageSize: Int
    $sortBy: ProductOrder
    $after: String
  ) {
    products(
      channel: $channel
      filter: { search: $query, attributes: $attributes }
      first: $pageSize
      sortBy: $sortBy
      after: $after
    ) {
      totalCount
      edges {
        node {
          ...ProductPricingField
          id
          name
          slug
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
      }
    }
    attributes(filter: { filterableInStorefront: true }, first: 100) {
      edges {
        node {
          ...Attribute
        }
      }
    }
  }
`;

export const TypedSearchProductsQuery = TypedQuery<
  SearchProducts,
  SearchProductsVariables
>(searchProductsQuery);
