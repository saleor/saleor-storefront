/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ResetPasswordRequest
// ====================================================

export interface ResetPasswordRequest_requestPasswordReset_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface ResetPasswordRequest_requestPasswordReset {
  __typename: "RequestPasswordReset";
  errors: ResetPasswordRequest_requestPasswordReset_errors[];
}

export interface ResetPasswordRequest {
  requestPasswordReset: ResetPasswordRequest_requestPasswordReset | null;
}

export interface ResetPasswordRequestVariables {
  email: string;
  redirectUrl: string;
}
