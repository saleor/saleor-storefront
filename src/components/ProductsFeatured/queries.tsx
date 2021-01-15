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
    collection(id: "Q29sbGVjdGlvbjoyOQ==") {
      id
      products(first: 50) {
        edges {
          node {
            ...BasicProductFields
            ...ProductPricingField
            category {
              id
              name
              translation(languageCode: EN) {
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
