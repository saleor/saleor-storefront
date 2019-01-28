import gql from "graphql-tag";

import { TypedMutation } from "../../../core/mutations";
import { TypedQuery } from "../../../core/queries";
import { createPayment, createPaymentVariables } from "./types/createPayment";
import {
  getPaymentToken,
  getPaymentTokenVariables
} from "./types/getPaymentToken";

const getPaymentTokenQuery = gql`
  query getPaymentToken($gateway: GatewaysEnum!) {
    paymentClientToken(gateway: $gateway)
  }
`;

const paymentMethodCreateMutation = gql`
  mutation createPayment($input: PaymentInput!) {
    checkoutPaymentCreate(input: $input) {
      errors {
        field
        message
      }
    }
  }
`;

export const TypedGetPaymentTokenQuery = TypedQuery<
  getPaymentToken,
  getPaymentTokenVariables
>(getPaymentTokenQuery);

export const TypedPaymentMethodCreateMutation = TypedMutation<
  createPayment,
  createPaymentVariables
>(paymentMethodCreateMutation);
