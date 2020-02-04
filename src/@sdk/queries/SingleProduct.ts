import gql from "graphql-tag";

import {
  basicProductFragment,
  selectedAttributeFragment,
  productVariantFragment,
  productPricingFragment,
} from "../fragments/products";

export const productQuery = gql`
  ${basicProductFragment}
  ${selectedAttributeFragment}
  ${productVariantFragment}
  ${productPricingFragment}
  query SingleProduct($id: ID!) {
    product(id: $id) {
      ...BasicProductFields
      ...ProductPricingField
      descriptionJson
      category {
        id
        name
        products(first: 4) {
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
      images {
        id
        url
      }
      attributes {
        ...SelectedAttributeFields
      }
      variants {
        ...ProductVariantFields
      }
      seoDescription
      seoTitle
      isAvailable
    }
  }
`;
