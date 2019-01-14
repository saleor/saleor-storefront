/* tslint:disable */
// This file was automatically generated and should not be edited.

import { PaymentInput } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: createPayment
// ====================================================

export interface createPayment_checkoutPaymentCreate_errors {
  field: string | null;
  message: string | null;
}

export interface createPayment_checkoutPaymentCreate {
  errors: createPayment_checkoutPaymentCreate_errors[] | null;
}

export interface createPayment {
  checkoutPaymentCreate: createPayment_checkoutPaymentCreate | null;
}

export interface createPaymentVariables {
  input: PaymentInput;
}
