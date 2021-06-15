import gql from "graphql-tag";

import {
  basicProductFragment,
  productPricingFragment,
  taxedPriceFragment,
} from "@graphql";

import { TypedQuery } from "../../core/queries";
import {
  ProductDetails,
  ProductDetailsVariables,
} from "./gqlTypes/ProductDetails";
import { VariantList, VariantListVariables } from "./gqlTypes/VariantList";

export const selectedAttributeFragment = gql`
  fragment SelectedAttributeFields on SelectedAttribute {
    attribute {
      id
      name
    }
    values {
      id
      name
    }
  }
`;

export const productVariantFragment = gql`
  ${taxedPriceFragment}
  fragment ProductVariantFields on ProductVariant {
    id
    sku
    name
    quantityAvailable(countryCode: $countryCode)
    images {
      id
      url
      alt
    }
    pricing {
      onSale
      priceUndiscounted {
        ...TaxedPrice
      }
      price {
        ...TaxedPrice
      }
    }
    attributes(variantSelection: VARIANT_SELECTION) {
      attribute {
        id
        name
        slug
      }
      values {
        id
        name
        value: name
      }
    }
  }
`;

export const productDetailsQuery = gql`
  ${basicProductFragment}
  ${selectedAttributeFragment}
  ${productVariantFragment}
  ${productPricingFragment}
  query ProductDetails($id: ID!, $channel: String, $countryCode: CountryCode) {
    product(id: $id, channel: $channel) {
      ...BasicProductFields
      ...ProductPricingField
      description
      category {
        id
        name
        products(first: 3, channel: $channel) {
          edges {
            node {
              ...BasicProductFields
              ...ProductPricingField
            }
          }
        }
      }
      images {
        id
        alt
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
      isAvailableForPurchase
      availableForPurchase
    }
  }
`;

// FIXME: Check how to handle pagination of `productVariants` in the UI.
// We need allow the user view  all cart items regardless of pagination.
export const productVariantsQuery = gql`
  ${basicProductFragment}
  ${productVariantFragment}
  query VariantList($ids: [ID!], $channel: String, $countryCode: CountryCode) {
    productVariants(ids: $ids, first: 100, channel: $channel) {
      edges {
        node {
          ...ProductVariantFields
          product {
            ...BasicProductFields
          }
        }
      }
    }
  }
`;

export const TypedProductDetailsQuery = TypedQuery<
  ProductDetails,
  ProductDetailsVariables
>(productDetailsQuery);

export const TypedProductVariantsQuery = TypedQuery<
  VariantList,
  VariantListVariables
>(productVariantsQuery);
