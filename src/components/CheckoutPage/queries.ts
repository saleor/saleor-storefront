import gql from "graphql-tag";

export const CREATE_CHECKOUT = gql`
  mutation createCheckout($checkoutInput: CheckoutCreateInput!) {
    checkoutCreate(input: $checkoutInput) {
      errors {
        field
        message
      }
      checkout {
        token
        id
      }
    }
  }
`;
