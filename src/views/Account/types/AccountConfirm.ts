/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AccountConfirm
// ====================================================

export interface AccountConfirm_accountConfirm_errors {
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

  export interface AccountConfirm_accountConfirm {
    __typename: "AccountConfirm";
    /**
     * List of errors that occurred executing the mutation.
     */
    errors: AccountConfirm_accountConfirm_errors[] | null;
  }

  export interface AccountConfirm {
    /**
     * Confirm user account by token sent by email during registration
     */
    accountConfirm: AccountConfirm_accountConfirm | null;
  }

  export interface AccountConfirmVariables {
    email: string;
    token: string;
  }
