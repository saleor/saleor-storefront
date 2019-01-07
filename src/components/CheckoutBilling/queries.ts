import gql from "graphql-tag";

import { checkoutFragment } from "../CheckoutApp/queries";

export const UPDATE_CHECKOUT_BILLING_ADDRESS = gql`
  ${checkoutFragment}
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
