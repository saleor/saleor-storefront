import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import {
  basicProductFragment,
  productNameTranslationFragment,
  productPricingFragment,
} from "../../views/Product/queries";
import {
  FeaturedProducts,
  FeaturedProductsVariables,
} from "./gqlTypes/FeaturedProducts";

export const featuredProducts = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  ${productNameTranslationFragment}
  query FeaturedProducts($locale: LanguageCodeEnum!) {
    shop {
      homepageCollection {
        id
        products(first: 20) {
          edges {
            node {
              ...BasicProductFields
              ...ProductPricingField
              ...ProductNameTranslationFields
              category {
                id
                name
                translation(languageCode: $locale) {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const TypedFeaturedProductsQuery = TypedQuery<
  FeaturedProducts,
  FeaturedProductsVariables
>(featuredProducts);
