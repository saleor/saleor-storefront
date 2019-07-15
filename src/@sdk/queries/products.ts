import gql from "graphql-tag";

import {
  basicProductFragment,
  productVariantFragment
} from "../fragments/products";

export const productDetails = gql`
  ${basicProductFragment}
  ${productVariantFragment}
  query ProductDetails($id: ID!) {
    product(id: $id) {
      ...BasicProductFields
      descriptionJson
      category {
        id
        name
        products(first: 4) {
          edges {
            node {
              ...BasicProductFields
              category {
                id
                name
              }
              price {
                amount
                currency
                localized
              }
            }
          }
        }
      }
      price {
        amount
        currency
        localized
      }
      images {
        id
        url
      }
      variants {
        ...ProductVariantFields
      }
      seoDescription
      seoTitle
      availability {
        available
      }
    }
  }
`;
