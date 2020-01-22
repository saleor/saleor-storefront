import gql from "graphql-tag";
import { TypedMutation } from "../../core/mutations";
import { AccountConfirm, AccountConfirmVariables } from "./types/AccountConfirm";

const accountConfirmMutation = gql`
  mutation confirmAccount($email: String!, $token: String!) {
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
