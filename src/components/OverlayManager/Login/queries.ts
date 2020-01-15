import gql from "graphql-tag";

import { TypedMutation } from "../../../core/mutations";
import {
  RegisterAccount,
  RegisterAccountVariables
} from "./types/RegisterAccount";

const accountRegisterMutation = gql`
  mutation RegisterAccount($email: String!, $password: String!, $redirectOrigin: String!) {
    accountRegister(input: { email: $email, password: $password, redirectOrigin: $redirectOrigin }) {
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
