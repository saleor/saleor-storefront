import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import {
  basicProductFragment,
  productPricingFragment,
} from "../Product/queries";
import { Category, CategoryVariables } from "./gqlTypes/Category";

export const categoryProductsQuery = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  query Category(
    $id: ID!
    $attributes: [AttributeInput]
    $after: String
    $pageSize: Int
    $sortBy: ProductOrder
    $priceLte: Float
    $priceGte: Float
  ) {
    products(
      after: $after
      first: $pageSize
      sortBy: $sortBy
      filter: {
        attributes: $attributes
        categories: [$id]
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
    category(id: $id) {
      seoDescription
      seoTitle
      id
      name
      backgroundImage {
        url
      }
      ancestors(last: 5) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
    attributes(filter: { inCategory: $id }, first: 100) {
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

export const TypedCategoryProductsQuery = TypedQuery<
  Category,
  CategoryVariables
>(categoryProductsQuery);
