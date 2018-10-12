import gql from "graphql-tag";

export const GET_CHECKOUT = gql`
  query getCheckout($token: UUID!) {
    checkout(token: $token) {
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
  }
`;
