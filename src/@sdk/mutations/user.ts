import gql from "graphql-tag";
import { userFragment } from "../fragments/auth";

export const changeUserPassword = gql`
  mutation PasswordChange($newPassword: String!, $oldPassword: String!) {
    passwordChange(newPassword: $newPassword, oldPassword: $oldPassword) {
      errors {
        field
        message
      }
    }
  }
`;

export const accountUpdate = gql`
  ${userFragment}
  mutation AccountUpdate($input: AccountInput!) {
    accountUpdate(input: $input) {
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
