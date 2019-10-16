import gql from "graphql-tag";

import {
  basicProductFragment,
  productVariantFragment
} from "../fragments/products";

export const productPricingFragment = gql`
  fragment ProductPricingField on Product {
    pricing {
      onSale
      priceRangeUndiscounted {
        start {
          ...Price
        }
        stop {
          ...Price
        }
      }
      priceRange {
        start {
          ...Price
        }
        stop {
          ...Price
        }
      }
    }
  }
`;

export const productListDetails = gql`
  ${basicProductFragment}
  query ProductList(
    $id: ID!
    $attributes: [AttributeInput]
    $after: String
    $pageSize: Int
    $sortBy: ProductOrder
    $priceLte: Float
    $priceGte: Float
  ) {
    products(
      after: $after
      first: $pageSize
      sortBy: $sortBy
      filter: {
        attributes: $attributes
        categories: [$id]
        minimalPrice: { gte: $priceGte, lte: $priceLte }
      }
    ) {
      totalCount
      edges {
        node {
          ...BasicProductFields
          price {
            amount
            currency
            localized
          }
          pricing {
            priceRange {
              start {
                gross {
                  localized
                }
              }
            }
          }
          category {
            id
            name
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;

export const productDetails = gql`
  ${basicProductFragment}
  ${productVariantFragment}
  ${productPricingFragment}
  query ProductDetails($id: ID!) {
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
