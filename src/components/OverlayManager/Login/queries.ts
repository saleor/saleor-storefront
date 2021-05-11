import gql from "graphql-tag";

import { TypedMutation } from "../../../core/mutations";
import {
  RegisterAccount,
  RegisterAccountVariables,
} from "./gqlTypes/RegisterAccount";

const accountRegisterMutation = gql`
  mutation RegisterAccount(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $phone: String!
    $redirectUrl: String!
    $country: CountryCode
    $isSupplier: Boolean!
    $storeName: String
  ) {
    accountRegister(
      input: {
        isSupplier: $isSupplier
        storeName: $storeName
        country: $country
        email: $email
        password: $password
        firstName: $firstName
        lastName: $lastName
        phone: $phone
        redirectUrl: $redirectUrl
      }
    ) {
      errors {
        field
        message
      }
      requiresConfirmation
    }
  }
`;

export const TypedAccountRegisterMutation = TypedMutation<
  RegisterAccount,
  RegisterAccountVariables
>(accountRegisterMutation);
