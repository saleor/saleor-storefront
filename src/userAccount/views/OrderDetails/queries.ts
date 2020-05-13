import gql from "graphql-tag";
import { TypedQuery } from "../../../core/queries";

import { OrderById, OrderByIdVariables } from "./types/OrderById";
import { OrderByToken, OrderByTokenVariables } from "./types/OrderByToken";

const orderPriceFragment = gql`
  fragment OrderPrice on TaxedMoney {
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

export const checkoutAddressFragment = gql`
  fragment Address on Address {
    id
    firstName
    lastName
    companyName
    streetAddress1
    streetAddress2
    city
    postalCode
    country {
      code
      country
    }
    countryArea
    phone
    isDefaultBillingAddress
    isDefaultShippingAddress
  }
`;

export const checkoutProductVariantFragment = gql`
  ${orderPriceFragment}
  fragment ProductVariant on ProductVariant {
    id
    name
    sku
    stockQuantity
    isAvailable
    pricing {
      onSale
      priceUndiscounted {
        ...OrderPrice
      }
      price {
        ...OrderPrice
      }
    }
    attributes {
      attribute {
        id
        name
      }
      values {
        id
        name
        value: name
      }
    }
    product {
      id
      name
      thumbnail {
        url
        alt
      }
      thumbnail2x: thumbnail(size: 510) {
        url
      }
      productType {
        isShippingRequired
      }
    }
  }
`;

const orderDetailFragment = gql`
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
        ...OrderPrice
        currency
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

const orderDetailsByIdQuery = gql`
  ${orderDetailFragment}
  query OrderById($id: ID!) {
    order(id: $id) {
      ...OrderDetail
    }
  }
`;

const orderDetailsByTokenQuery = gql`
  ${orderDetailFragment}
  query OrderByToken($token: UUID!) {
    orderByToken(token: $token) {
      ...OrderDetail
    }
  }
`;

export const TypedOrderDetailsByIdQuery = TypedQuery<
  OrderById,
  OrderByIdVariables
>(orderDetailsByIdQuery);

export const TypedOrderDetailsByTokenQuery = TypedQuery<
  OrderByToken,
  OrderByTokenVariables
>(orderDetailsByTokenQuery);
