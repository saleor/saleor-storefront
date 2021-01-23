import gql from "graphql-tag";

import {
  basicProductFragment,
  productPricingFragment,
} from "@temp/views/Product/queries";

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
