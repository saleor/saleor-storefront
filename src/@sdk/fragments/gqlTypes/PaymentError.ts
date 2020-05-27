/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { PaymentErrorCode } from "./../../gqlTypes/globalTypes";

// ====================================================
// GraphQL fragment: PaymentError
// ====================================================

export interface PaymentError {
  __typename: "PaymentError";
  /**
   * The error code.
   */
  code: PaymentErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
}
