import gql from "graphql-tag";

import { TypedQuery } from "../../../core/queries";
import {
  basicProductFragment,
  productPricingFragment,
} from "../../Product/queries";
import {
  Collection,
  CollectionVariables,
} from "../../Collection/types/Collection";
import { productVariantFragment } from "@temp/@sdk/fragments/products";

export const collectionSampleQuery = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  ${productVariantFragment}
  query Collection($id: ID!, $after: String, $pageSize: Int, $catId: ID) {
    products(
      after: $after
      first: $pageSize
      filter: { collections: [$id], categories: [$catId] }
    ) {
      totalCount
      edges {
        node {
          ...BasicProductFields
          ...ProductPricingField
          variants {
            ...ProductVariantFields
          }
          category {
            id
            name
          }
        }
      }
    }
  }
`;

export const TypedCollectionSampleQuery = TypedQuery<
  Collection,
  CollectionVariables
>(collectionSampleQuery);
