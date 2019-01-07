import gql from "graphql-tag";

import { checkoutFragment } from "../CheckoutApp/queries";

export const CREATE_CHECKOUT = gql`
  ${checkoutFragment}
  mutation createCheckout($checkoutInput: CheckoutCreateInput!) {
    checkoutCreate(input: $checkoutInput) {
      errors {
        field
        message
      }
      checkout {
        ...Checkout
      }
    }
  }
`;
