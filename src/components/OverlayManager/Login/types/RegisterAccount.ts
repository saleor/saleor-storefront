/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RegisterAccount
// ====================================================

export interface RegisterAccount_accountRegister_errors {
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

export interface RegisterAccount_accountRegister {
  __typename: "AccountRegister";
  /**
   * List of errors that occurred executing the mutation.
   */
  errors: RegisterAccount_accountRegister_errors[] | null;
  /**
   * Informs whether users need to confirm their email address.
   */
  requiresConfirmation: boolean | null;
}

export interface RegisterAccount {
  /**
   * Register a new user.
   */
  accountRegister: RegisterAccount_accountRegister | null;
}

export interface RegisterAccountVariables {
  email: string;
  password: string;
  redirectUrl: string;
}
