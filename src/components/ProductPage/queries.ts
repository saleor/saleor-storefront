import gql from "graphql-tag";

export const BASIC_PRODUCT_FRAGMENT = gql`
  fragment BasicProductFields on Product {
    id
    name
    thumbnailUrl
  }
`;

export const GET_PRODUCT_DETAILS = gql`
  ${BASIC_PRODUCT_FRAGMENT}
  query ProductDetails($id: ID!) {
    product(id: $id) {
      ...BasicProductFields
      description
      variants {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_VARIANT_DETAILS = gql`
  ${BASIC_PRODUCT_FRAGMENT}
  query ProductVariantDetails($id: ID!) {
    productVariant(id: $id) {
      id
      stockQuantity
      costPrice {
        currency
        amount
      }
      product {
        ...BasicProductFields
      }
    }
  }
`;
