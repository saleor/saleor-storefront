import gql from "graphql-tag";

import { CHECKOUT_FRAGMENT } from "../CheckoutApp/queries";

export const UPDATE_CHECKOUT_SHIPPING_ADDRESS = gql`
  ${CHECKOUT_FRAGMENT}
  mutation updateCheckoutShippingAddress(
    $checkoutId: ID!
    $shippingAddress: AddressInput!
  ) {
    checkoutShippingAddressUpdate(
      checkoutId: $checkoutId
      shippingAddress: $shippingAddress
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
