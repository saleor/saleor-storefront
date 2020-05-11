/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: confirmAccount
// ====================================================

export interface confirmAccount_confirmAccount_errors {
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

export interface confirmAccount_confirmAccount {
  __typename: "ConfirmAccount";
  /**
   * List of errors that occurred executing the mutation.
   */
  errors: confirmAccount_confirmAccount_errors[];
}

export interface confirmAccount {
  /**
   * Confirm user account with token sent by email during registration.
   */
  confirmAccount: confirmAccount_confirmAccount | null;
}

export interface confirmAccountVariables {
  email: string;
  token: string;
}
