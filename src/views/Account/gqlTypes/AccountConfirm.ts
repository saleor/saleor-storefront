/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AccountConfirm
// ====================================================

export interface AccountConfirm_confirmAccount_errors {
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

export interface AccountConfirm_confirmAccount {
  __typename: "ConfirmAccount";
  /**
   * List of errors that occurred executing the mutation.
   */
  errors: AccountConfirm_confirmAccount_errors[];
}

export interface AccountConfirm {
  /**
   * Confirm user account with token sent by email during registration.
   */
  confirmAccount: AccountConfirm_confirmAccount | null;
}

export interface AccountConfirmVariables {
  email: string;
  token: string;
}
