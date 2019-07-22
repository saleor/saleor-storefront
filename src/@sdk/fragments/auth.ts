import gql from "graphql-tag";

import { checkoutAddressFragment } from "./checkout";

export const userFragment = gql`
  ${checkoutAddressFragment}
  fragment User on User {
    id
    email
    firstName
    lastName
    isStaff
    defaultShippingAddress {
      ...Address
    }
    defaultBillingAddress {
      ...Address
    }
    addresses {
      ...Address
    }
  }
`;
