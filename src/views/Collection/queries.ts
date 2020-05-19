import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import { 
  basicProductFragment,
  productNameTranslationFragment,
  productPricingFragment,
} from "../Product/queries";
import { Collection, CollectionVariables } from "./gqlTypes/Collection";

export const collectionProductsQuery = gql`
  ${basicProductFragment}
  ${productNameTranslationFragment}
  ${productPricingFragment}
  query Collection(
    $id: ID!
    $attributes: [AttributeInput]
    $after: String
    $pageSize: Int
    $sortBy: ProductOrder
    $priceLte: Float
    $priceGte: Float
    $locale:LanguageCodeEnum!
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
      translation(languageCode:$locale){name}
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
    attributes(filter: { inCollection: $id }, first: 100) {
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

export const TypedCollectionProductsQuery = TypedQuery<
  Collection,
  CollectionVariables
>(collectionProductsQuery);
