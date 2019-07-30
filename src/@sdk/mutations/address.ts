import gql from "graphql-tag";

import { userFragment } from "../fragments/auth";

export const setCustomerDefaultAddress = gql`
  ${userFragment}
  mutation SetCustomerDefaultAddress(
    $addressId: ID!
    $userId: ID!
    $type: AddressTypeEnum!
  ) {
    addressSetDefault(addressId: $addressId, userId: $userId, type: $type) {
      errors {
        field
        message
      }
      user {
        ...User
      }
    }
  }
`;

export const deleteUserAddress = gql`
  ${userFragment}
  mutation DeleteUserAddress($addressId: ID!) {
    addressDelete(id: $addressId) {
      errors {
        field
        message
      }
      user {
        ...User
      }
    }
  }
`;
