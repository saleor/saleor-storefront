import gql from "graphql-tag";
import { TypedMutation } from "../../core/mutations";
import { TokenAuth, TokenAuthVariables } from "./types/TokenAuth";

export const userFragment = gql`
  fragment User on User {
    id
    email
    firstName
    lastName
    isStaff
  }
`;

export const tokenAuthMutation = gql`
  ${userFragment}
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

export const tokenVeryficationMutation = gql`
  ${userFragment}
  mutation VerifyToken($token: String!) {
    tokenVerify(token: $token) {
      payload
      user {
        ...User
      }
    }
  }
`;

export const TypedTokenAuthMutation = TypedMutation<
  TokenAuth,
  TokenAuthVariables
>(tokenAuthMutation);
