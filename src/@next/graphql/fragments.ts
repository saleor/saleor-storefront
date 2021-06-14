import gql from "graphql-tag";

export const priceFragment = gql`
  fragment Price on Money {
    amount
    currency
  }
`;

export const taxedPriceFragment = gql`
  ${priceFragment}
  fragment TaxedPrice on TaxedMoney {
    gross {
      ...Price
    }
    net {
      ...Price
    }
  }
`;

export const basicProductFragment = gql`
  fragment BasicProductFields on Product {
    id
    slug
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

export const productPricingFragment = gql`
  ${taxedPriceFragment}
  fragment ProductPricingField on Product {
    pricing {
      onSale
      priceRangeUndiscounted {
        start {
          ...TaxedPrice
        }
        stop {
          ...TaxedPrice
        }
      }
      priceRange {
        start {
          ...TaxedPrice
        }
        stop {
          ...TaxedPrice
        }
      }
    }
  }
`;

export const featuredProductFragment = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  fragment FeaturedProduct on Product {
    ...BasicProductFields
    ...ProductPricingField
    category {
      id
      name
    }
  }
`;

export const featuredProductsFragment = gql`
  ${featuredProductFragment}
  fragment FeaturedProducts on Query {
    collection(slug: "featured-products", channel: $channel) {
      id
      name
      backgroundImage {
        url
      }
      products(first: 20) {
        edges {
          node {
            ...FeaturedProduct
          }
        }
      }
    }
  }
`;

export const attributeFragment = gql`
  fragment Attribute on Attribute {
    id
    name
    slug
    choices(first: 100) {
      edges {
        node {
          id
          name
          slug
        }
      }
    }
  }
`;

export const menuItemFragment = gql`
  fragment MenuItem on MenuItem {
    id
    name
    category {
      id
      name
      slug
    }
    url
    collection {
      id
      name
      slug
    }
    page {
      slug
    }
    parent {
      id
    }
  }
`;
