/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ResetPasswordRequest
// ====================================================

export interface ResetPasswordRequest_requestPasswordReset_errors {
  __typename: "Error";
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
  /**
   * List of errors that occurred executing the mutation.
   */
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
}
