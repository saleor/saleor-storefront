import gql from "graphql-tag";

export const GET_PAYMENT_TOKEN = gql`
  query getPaymentToken($gateway: ProvidersEnum!) {
    paymentClientToken(gateway: $gateway)
  }
`;
