import gql from "graphql-tag";

import { TypedMutation } from "../../../core/mutations";
import { checkoutFragment } from "../../queries";
import {
  updateCheckoutShippingAddress,
  updateCheckoutShippingAddressVariables
} from "./types/updateCheckoutShippingAddress";

const updateCheckoutShippingAddressMutation = gql`
  ${checkoutFragment}
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

export const TypedUpdateCheckoutShippingAddressMutation = TypedMutation<
  updateCheckoutShippingAddress,
  updateCheckoutShippingAddressVariables
>(updateCheckoutShippingAddressMutation);
