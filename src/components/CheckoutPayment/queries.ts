import gql from "graphql-tag";

export const GET_PAYMENT_TOKEN = gql`
  query getPaymentToken($gateway: ProvidersEnum!) {
    paymentClientToken(gateway: $gateway)
  }
`;

export const PAYMENT_METHOD_CREATE = gql`
  mutation createPaymentMethod($input: PaymentMethodInput!) {
    checkoutPaymentMethodCreate(input: $input) {
      errors {
        field
        message
      }
    }
  }
`;
