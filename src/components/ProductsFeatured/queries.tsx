import gql from "graphql-tag";

import {
  basicProductFragment,
  productPricingFragment,
} from "../../app/views/Product/queries";
import { TypedQuery } from "../../core/queries";
import { FeaturedProducts } from "./types/FeaturedProducts";

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
