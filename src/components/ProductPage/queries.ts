import gql from "graphql-tag";

export const BASIC_PRODUCT_FRAGMENT = gql`
  fragment BasicProductFields on Product {
    id
    name
    thumbnailUrl
    thumbnailUrl2x: thumbnailUrl(size: 510)
  }
`;

export const PRODUCT_VARIANT_FRAGMENT = gql`
  fragment ProductVariantFields on ProductVariant {
    id
    name
    stockQuantity
    price {
      currency
      amount
      localized
    }
    attributes {
      attribute {
        id
        name
      }
      value {
        id
        name
        value: name
      }
    }
  }
`;

export const GET_PRODUCT_DETAILS = gql`
  ${BASIC_PRODUCT_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
  query ProductDetails($id: ID!) {
    product(id: $id) {
      ...BasicProductFields
      description
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
    }
  }
`;

export const GET_PRODUCTS_VARIANTS = gql`
  ${BASIC_PRODUCT_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
  query VariantList($ids: [ID!]) {
    productVariants(ids: $ids) {
      ...ProductVariantFields
      product {
        ...BasicProductFields
      }
    }
  }
`;
