import gql from "graphql-tag";

import {
  checkoutAddressFragment,
  checkoutProductVariantFragment
} from "./checkout";

export const orderPriceFragment = gql`
  fragment OrderPrice on TaxedMoney {
    gross {
      amount
      currency
      localized
    }
    net {
      amount
      currency
      localized
    }
  }
`;

export const orderDetailFragment = gql`
  ${orderPriceFragment}
  ${checkoutAddressFragment}
  ${checkoutProductVariantFragment}
  fragment OrderDetail on Order {
    userEmail
    paymentStatus
    paymentStatusDisplay
    status
    statusDisplay
    id
    number
    shippingAddress {
      ...Address
    }
    lines {
      productName
      quantity
      variant {
        ...ProductVariant
      }
      unitPrice {
        currency
        gross {
          amount
        }
      }
    }
    subtotal {
      ...OrderPrice
    }
    total {
      ...OrderPrice
    }
    shippingPrice {
      ...OrderPrice
    }
  }
`;
