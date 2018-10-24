import gql from "graphql-tag";

export const COMPLETE_CHECKOUT = gql`
  mutation completeCheckout($checkoutId: ID!) {
    checkoutComplete(checkoutId: $checkoutId) {
      errors {
        field
        message
      }
      order {
        id
      }
    }
  }
`;
