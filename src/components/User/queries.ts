import gql from "graphql-tag";

export const USER_FRAGMENT = gql`
  fragment User on User {
    id
    email
    isStaff
    note
  }
`;

export const TOKEN_AUTH_MUTATION = gql`
  ${USER_FRAGMENT}
  mutation TokenAuth($email: String!, $password: String!) {
    tokenCreate(email: $email, password: $password) {
      token
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

export const TOKEN_VERIFICATION_MUTATION = gql`
  ${USER_FRAGMENT}
  mutation VerifyToken($token: String!) {
    tokenVerify(token: $token) {
      payload
      user {
        ...User
      }
    }
  }
`;

export const CUSTOMER_REGISTER_MUTATION = gql`
  mutation RegisterCutomer($email: String!, $password: String!) {
    customerRegister(input: { email: $email, password: $password }) {
      errors {
        field
        message
      }
    }
  }
`;

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
