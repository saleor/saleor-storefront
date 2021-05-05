import gql from "graphql-tag";

import { TypedQuery } from "@temp/core/queries";

import {
  ListCarouselRes,
  ListFollow,
  ProductList,
  ProductListVariables,
} from "./gqlTypes/ProductList";

export const fragmentMoney = gql`
  fragment Money on Money {
    amount
    currency
  }
`;

export const priceRangeFragment = gql`
  ${fragmentMoney}
  fragment PriceRangeFragment on TaxedMoneyRange {
    start {
      net {
        ...Money
      }
    }
    stop {
      net {
        ...Money
      }
    }
  }
`;

export const channelListingProductWithoutPricingFragment = gql`
  fragment ChannelListingProductWithoutPricingFragment on ProductChannelListing {
    isPublished
    publicationDate
    isAvailableForPurchase
    availableForPurchase
    visibleInListings
    channel {
      id
      name
      currencyCode
    }
  }
`;

export const channelListingProductFragment = gql`
  ${priceRangeFragment}
  ${channelListingProductWithoutPricingFragment}
  fragment ChannelListingProductFragment on ProductChannelListing {
    ...ChannelListingProductWithoutPricingFragment
    pricing {
      priceRange {
        ...PriceRangeFragment
      }
    }
  }
`;

export const productFragment = gql`
  ${channelListingProductFragment}
  fragment ProductFragment on Product {
    id
    name
    thumbnail {
      url
    }
    productType {
      id
      name
      hasVariants
    }
    channelListings {
      ...ChannelListingProductFragment
    }
  }
`;

export const fileFragment = gql`
  fragment FileFragment on File {
    url
    contentType
  }
`;

export const attributeValueFragment = gql`
  ${fileFragment}
  fragment AttributeValueFragment on AttributeValue {
    id
    name
    slug
    file {
      ...FileFragment
    }
    reference
  }
`;

const productListQuery = gql`
  ${productFragment}
  ${attributeValueFragment}
  query ProductList(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $filter: ProductFilterInput
    $sort: ProductOrder
  ) {
    products(
      before: $before
      after: $after
      first: $first
      last: $last
      filter: $filter
      sortBy: $sort
    ) {
      edges {
        node {
          ...ProductFragment
          attributes {
            attribute {
              id
            }
            values {
              ...AttributeValueFragment
            }
          }
        }
      }
    }
  }
`;
export const TypedProductListQuery = TypedQuery<
  ProductList,
  ProductListVariables
>(productListQuery);

const getListCarousel = gql`
  query pages {
    pages(first: 10) {
      edges {
        node {
          id
          media {
            id
            image
          }
        }
      }
    }
  }
`;
export const TypedListCarousel = TypedQuery<ListCarouselRes, {}>(
  getListCarousel
);

const getFollowList = gql`
  query socials {
    socials(first: 100) {
      edges {
        node {
          follow
          user {
            email
          }
          store {
            id
            name
          }
        }
      }
    }
  }
`;

export const TypedListFollow = TypedQuery<ListFollow, {}>(getFollowList);
