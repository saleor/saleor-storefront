import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import {
  basicProductFragment,
  productPricingFragment,
} from "../../views/Product/queries";
import {
  FeaturedProducts,
  FeaturedProductsVariables,
} from "./gqlTypes/FeaturedProducts";

export const featuredProducts = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  query FeaturedProducts($channel: String) {
    collection(slug: "featured-products", channel: $channel) {
      name
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
`;

export const TypedFeaturedProductsQuery = TypedQuery<
  FeaturedProducts,
  FeaturedProductsVariables
>(featuredProducts);
