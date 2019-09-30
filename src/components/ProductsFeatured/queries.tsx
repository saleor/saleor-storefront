import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import {
  basicProductFragment,
  productPricingFragment
} from "../../views/Product/queries";
import { ProductsList } from "./types/ProductsList";

export const featuredProducts = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  query ProductsList {
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

export const TypedFeaturedProductsQuery = TypedQuery<ProductsList, {}>(
  featuredProducts
);
