import gql from "graphql-tag";
import { TypedMutation } from "../../core/mutations";
import {
  AccountConfirm,
  AccountConfirmVariables,
} from "./gqlTypes/AccountConfirm";

const accountConfirmMutation = gql`
  mutation AccountConfirm($email: String!, $token: String!) {
    confirmAccount(email: $email, token: $token) {
      errors {
        field
        message
      }
    }
  }
`;

export const TypedAccountConfirmMutation = TypedMutation<
  AccountConfirm,
  AccountConfirmVariables
>(accountConfirmMutation);
