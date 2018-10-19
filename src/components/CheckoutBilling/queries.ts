import gql from "graphql-tag";

import { CHECKOUT_FRAGMENT } from "../CheckoutApp/queries";

export const UPDATE_CHECKOUT_BILLING_ADDRESS = gql`
  ${CHECKOUT_FRAGMENT}
  mutation updateCheckoutBillingAddress(
    $checkoutId: ID!
    $billingAddress: AddressInput!
  ) {
    checkoutBillingAddressUpdate(
      checkoutId: $checkoutId
      billingAddress: $billingAddress
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
