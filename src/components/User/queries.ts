import gql from "graphql-tag";

export const USER_FRAGMENT = gql`
  fragment User on User {
    id
    email
    isStaff
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
