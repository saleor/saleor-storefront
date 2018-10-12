import gql from "graphql-tag";

import { CHECKOUT_FRAGMENT } from "../CheckoutApp/queries";

export const UPDATE_CHECKOUT_SHIPPING_OPTION = gql`
  ${CHECKOUT_FRAGMENT}
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
