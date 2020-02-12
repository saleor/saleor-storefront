import gql from "graphql-tag";

import { TypedMutation } from "../../../core/mutations";
import { createPayment, createPaymentVariables } from "./types/createPayment";

const paymentMethodCreateMutation = gql`
  mutation createPayment($input: PaymentInput!, $checkoutId: ID!) {
    checkoutPaymentCreate(input: $input, checkoutId: $checkoutId) {
      errors {
        field
        message
      }
    }
  }
`;

export const TypedPaymentMethodCreateMutation = TypedMutation<
  createPayment,
  createPaymentVariables
>(paymentMethodCreateMutation);
