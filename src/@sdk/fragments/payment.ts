import gql from "graphql-tag";

export const paymentFragment = gql`
  fragment Payment on Payment {
    id
    gateway
    token
    creditCard {
      brand
      firstDigits
      lastDigits
      expMonth
      expYear
    }
  }
`;

export const paymentErrorFragment = gql`
  fragment PaymentError on PaymentError {
    code
    field
    message
  }
`;
