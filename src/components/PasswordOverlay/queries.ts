import gql from "graphql-tag";

export const PASSWORD_RESET_MUTATION = gql`
  mutation ResetPassword($email: String!) {
    customerPasswordReset(input: { email: $email }) {
      errors {
        field
        message
      }
    }
  }
`;
