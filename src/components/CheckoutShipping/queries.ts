import gql from "graphql-tag";

import { CHECKOUT_FRAGMENT } from "../CheckoutApp/queries";

export const UPDATE_CHECKOUT_SHIPPING_ADDRESS = gql`
  ${CHECKOUT_FRAGMENT}
  mutation updateCheckoutShippingAddress(
    $checkoutId: ID!
    $shippingAddress: AddressInput!
    $email: String!
  ) {
    checkoutShippingAddressUpdate(
      checkoutId: $checkoutId
      shippingAddress: $shippingAddress
    ) {
      errors {
        field
        message
      }
    }
    checkoutEmailUpdate(checkoutId: $checkoutId, email: $email) {
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
