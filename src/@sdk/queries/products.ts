import gql from "graphql-tag";

const basicProductFragment = gql`
  fragment BasicProductFields on Product {
    id
    name
    thumbnail {
      url
      alt
    }
    thumbnail2x: thumbnail(size: 510) {
      url
    }
  }
`;

const productVariantFragment = gql`
  fragment ProductVariantFields on ProductVariant {
    id
    sku
    name
    stockQuantity
    isAvailable
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
