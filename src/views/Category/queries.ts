import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import {
  basicProductFragment,
  productNameTranslationFragment,
  productPricingFragment,
} from "../Product/queries";
import { Category, CategoryVariables } from "./gqlTypes/Category";

export const categoryProductsQuery = gql`
  ${basicProductFragment}
  ${productNameTranslationFragment}
  ${productPricingFragment}
  query Category(
    $id: ID!
    $attributes: [AttributeInput]
    $after: String
    $pageSize: Int
    $sortBy: ProductOrder
    $priceLte: Float
    $priceGte: Float
    $locale:LanguageCodeEnum!
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
          ...ProductNameTranslationFields
          category {
            id
            name
            translation(languageCode:$locale){name}
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
      translation(languageCode:$locale){name}
      ancestors(last: 5) {
        edges {
          node {
            id
            name
            translation(languageCode:$locale){name}
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
          translation(languageCode:$locale){name}
          values {
            id
            name
            slug
            translation(languageCode:$locale){name}
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
