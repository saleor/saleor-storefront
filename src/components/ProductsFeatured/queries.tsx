import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import {
  basicProductFragment,
  productPricingFragment,
} from "../../views/Product/queries";
import { FeaturedProducts } from "./gqlTypes/FeaturedProducts";

export const featuredProducts = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  query FeaturedProducts {
    shop {
      homepageCollection {
        id
        products(first: 20) {
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
        }
      }
    }
  }
`;

export const TypedFeaturedProductsQuery = TypedQuery<FeaturedProducts, {}>(
  featuredProducts
);
