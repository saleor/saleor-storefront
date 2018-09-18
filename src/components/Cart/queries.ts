import gql from "graphql-tag";
import { BASIC_PRODUCT_FRAGMENT } from "../ProductPage/queries";

// TODO: we don't have productVariants query definition yet, for now use only one
// https://github.com/mirumee/saleor/issues/2741
export const GET_VARIANTS = gql`
  ${BASIC_PRODUCT_FRAGMENT}
  query VariantList($ids: [ID!]) {
    productVariants(ids: $ids) {
      edges {
        node {
          id
          name
          price {
            currency
            amount
          }
          product {
            ...BasicProductFields
          }
        }
      }
    }
  }
`;
