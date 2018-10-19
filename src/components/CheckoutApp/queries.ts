import gql from "graphql-tag";

export const CHECKOUT_FRAGMENT = gql`
  fragment Checkout on Checkout {
    token
    id
    totalPrice {
      net {
        amount
      }
      gross {
        amount
      }
      currency
    }
    subtotalPrice {
      net {
        amount
      }
      gross {
        amount
      }
      currency
    }
    billingAddress {
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
    }
    shippingAddress {
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
    }
    availableShippingMethods {
      id
      name
      price {
        currency
        amount
      }
    }
    shippingMethod {
      id
      name
      price {
        currency
        amount
      }
    }
    shippingPrice {
      net {
        amount
      }
      gross {
        amount
      }
      currency
    }
    lines {
      id
      quantity
      totalPrice {
        net {
          amount
        }
        gross {
          amount
        }
        currency
      }
      variant {
        id
        name
        price {
          amount
          currency
        }
        product {
          id
          name
          thumbnailUrl
        }
      }
      quantity
    }
  }
`;

export const GET_CHECKOUT = gql`
  ${CHECKOUT_FRAGMENT}
  query getCheckout($token: UUID!) {
    checkout(token: $token) {
      ...Checkout
    }
  }
`;
