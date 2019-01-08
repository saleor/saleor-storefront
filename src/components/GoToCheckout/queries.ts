import gql from "graphql-tag";

import { checkoutFragment } from "../CheckoutApp/queries";

export const createCheckoutQuery = gql`
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
