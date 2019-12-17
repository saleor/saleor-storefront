/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RegisterCutomer
// ====================================================

export interface RegisterCutomer_accountRegister_errors {
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

export interface RegisterCutomer_accountRegister {
  __typename: "AccountRegister";
  /**
   * List of errors that occurred executing the mutation.
   */
  errors: RegisterCutomer_accountRegister_errors[] | null;
}

export interface RegisterCutomer {
  /**
   * Register a new user.
   */
  accountRegister: RegisterCutomer_accountRegister | null;
}

export interface RegisterCutomerVariables {
  email: string;
  password: string;
}
