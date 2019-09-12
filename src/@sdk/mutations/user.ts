import gql from "graphql-tag";

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
