/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ResetPasswordRequest
// ====================================================

export interface ResetPasswordRequest_requestPasswordReset_errors {
  __typename: "AccountError";
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

export interface ResetPasswordRequest_requestPasswordReset {
  __typename: "RequestPasswordReset";
  errors: ResetPasswordRequest_requestPasswordReset_errors[];
}

export interface ResetPasswordRequest {
  /**
   * Sends an email with the account password modification link.
   */
  requestPasswordReset: ResetPasswordRequest_requestPasswordReset | null;
}

export interface ResetPasswordRequestVariables {
  email: string;
  redirectUrl: string;
  channel?: string | null;
}
