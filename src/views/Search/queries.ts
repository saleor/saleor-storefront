import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import { productNameTranslationFragment, productPricingFragment } from "../Product/queries";
import {
  SearchProducts,
  SearchProductsVariables,
} from "./gqlTypes/SearchProducts";

export const searchProductsQuery = gql`
  ${productPricingFragment}
  ${productNameTranslationFragment}
  query SearchProducts(
    $query: String!
    $attributes: [AttributeInput]
    $pageSize: Int
    $sortBy: ProductOrder
    $after: String
    $locale:LanguageCodeEnum!
  ) {
    products(
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
          ...ProductNameTranslationFields
          ...ProductNameTranslationFields
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
            translation(languageCode:$locale){name}
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
    attributes(first: 100) {
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

export const TypedSearchProductsQuery = TypedQuery<
  SearchProducts,
  SearchProductsVariables
>(searchProductsQuery);
