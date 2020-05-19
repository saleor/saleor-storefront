import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import {
  ProductDetails,
  ProductDetailsVariables,
} from "./gqlTypes/ProductDetails";
import { VariantList, VariantListVariables } from "./gqlTypes/VariantList";

export const priceFragment = gql`
  fragment Price on TaxedMoney {
    gross {
      amount
      currency
    }
    net {
      amount
      currency
    }
  }
`;

export const basicProductFragment = gql`
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

export const productNameTranslationFragment = gql`
  fragment ProductNameTranslationFields on Product {
    translation(languageCode:$locale){
      name
      descriptionJson
      seoDescription
      seoTitle
    }  
  }
`;

export const productVariantTranslationFragment = gql`
  fragment ProductVariantTranslationFields on ProductVariant {
    translation(languageCode:$locale){
      name
    }  
  }
`;

export const productPricingFragment = gql`
  ${priceFragment}
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

export const selectedAttributeFragment = gql`
  fragment SelectedAttributeFields on SelectedAttribute {
    attribute {
      id
      name
      translation(languageCode:$locale){name}
    }
    values {
      id
      name
      translation(languageCode:$locale){name}
    }
  }
`;

export const productVariantFragment = gql`
  ${priceFragment}
  fragment ProductVariantFields on ProductVariant {
    id
    sku
    name
    stockQuantity
    isAvailable
    images {
      id
      url
      alt
    }
    pricing {
      onSale
      priceUndiscounted {
        ...Price
      }
      price {
        ...Price
      }
    }
    attributes {
      attribute {
        id
        name
        translation(languageCode:$locale){name}
      }
      values {
        id
        name
        value: name
        translation(languageCode:$locale){name}
      }
    }
  }
`;

export const productDetailsQuery = gql`
  ${basicProductFragment}
  ${selectedAttributeFragment}
  ${productNameTranslationFragment}
  ${productVariantTranslationFragment}
  ${productVariantFragment}
  ${productPricingFragment}
  query ProductDetails(
    $id: ID!
    $locale:LanguageCodeEnum!
    ) {
    product(id: $id) {
      ...BasicProductFields
      ...ProductPricingField
      ...ProductNameTranslationFields
      descriptionJson
      category {
        id
        name
        translation(languageCode:$locale){name}
        products(first: 3) {
          edges {
            node {
              ...BasicProductFields
              ...ProductPricingField
              ...ProductNameTranslationFields
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
        ...ProductVariantTranslationFields
      }
      seoDescription
      seoTitle
      isAvailable
    }
  }
`;

// FIXME: Check how to handle pagination of `productVariants` in the UI.
// We need allow the user view  all cart items regardless of pagination.
export const productVariantsQuery = gql`
  ${basicProductFragment}
  ${productNameTranslationFragment}
  ${productVariantFragment}
  ${productVariantTranslationFragment}
  query VariantList(
    $ids: [ID!]
    $locale:LanguageCodeEnum!
  ) {
    productVariants(ids: $ids, first: 100) {
      edges {
        node {
          ...ProductVariantFields
          ...ProductVariantTranslationFields
          stockQuantity
          product {
            ...BasicProductFields
            ...ProductNameTranslationFields
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
