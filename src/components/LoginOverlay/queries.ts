import gql from "graphql-tag";

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
