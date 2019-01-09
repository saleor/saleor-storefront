import gql from "graphql-tag";

import { checkoutFragment } from "../CheckoutApp/queries";

export const UPDATE_CHECKOUT_SHIPPING_OPTION = gql`
  ${checkoutFragment}
  mutation updateCheckoutShippingOptions(
    $checkoutId: ID!
    $shippingMethodId: ID!
  ) {
    checkoutShippingMethodUpdate(
      checkoutId: $checkoutId
      shippingMethodId: $shippingMethodId
    ) {
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
