import gql from "graphql-tag";

export const CREATE_CHECKOUT = gql`
  mutation createCheckout($checkoutInput: CheckoutCreateInput!) {
    checkoutCreate(input: $checkoutInput) {
      checkout {
        token
        id
        lines {
          edges {
            node {
              id
              quantity
            }
          }
        }
      }
    }
  }
`;

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
      lines {
        edges {
          node {
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
    }
  }
`;
