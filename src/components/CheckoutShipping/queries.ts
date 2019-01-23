import gql from "graphql-tag";

import { TypedMutation } from "../../core/mutations";
import { checkoutFragment } from "../CheckoutApp/queries";
import {
  updateCheckoutShippingAddress,
  updateCheckoutShippingAddressVariables
} from "./types/updateCheckoutShippingAddress";

const updateCheckoutShippingAddressMutation = gql`
  ${checkoutFragment}
  mutation updateCheckoutShippingAddresss(
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

export const TypedUpdateCheckoutShippingAddressMutation = TypedMutation<
  updateCheckoutShippingAddress,
  updateCheckoutShippingAddressVariables
>(updateCheckoutShippingAddressMutation);
