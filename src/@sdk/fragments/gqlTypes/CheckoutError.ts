/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CheckoutErrorCode } from "./../../gqlTypes/globalTypes";

// ====================================================
// GraphQL fragment: CheckoutError
// ====================================================

export interface CheckoutError {
  __typename: "CheckoutError";
  /**
   * The error code.
   */
  code: CheckoutErrorCode;
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
