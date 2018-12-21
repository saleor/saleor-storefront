import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import { productNodeFragment } from "../ProductListItem/queries";
import { ProductsList } from "./types/ProductsList";

export const featuredProducts = gql`
  ${productNodeFragment}
  query ProductsList {
    shop {
      homepageCollection {
        id
        products(first: 20) {
          edges {
            node {
              ...ProductNodeFragment
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
