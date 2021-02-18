import gql from "graphql-tag";
import { useMutation } from "react-apollo";

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

export const useAccountConfirmMutation = (variables: AccountConfirmVariables) =>
  useMutation<AccountConfirm, AccountConfirmVariables>(accountConfirmMutation, {
    variables,
  });
