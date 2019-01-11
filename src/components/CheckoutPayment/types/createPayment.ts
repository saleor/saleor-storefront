/* tslint:disable */
// This file was automatically generated and should not be edited.

import { PaymentInput } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: createPayment
// ====================================================

export interface createPayment_checkoutPaymentCreate_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface createPayment_checkoutPaymentCreate {
  __typename: "CheckoutPaymentCreate";
  errors: createPayment_checkoutPaymentCreate_errors[] | null;
}

export interface createPayment {
  checkoutPaymentCreate: createPayment_checkoutPaymentCreate | null;
}

export interface createPaymentVariables {
  input: PaymentInput;
}
