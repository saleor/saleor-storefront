/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: PasswordChange
// ====================================================

export interface PasswordChange_passwordChange_errors {
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

export interface PasswordChange_passwordChange {
  __typename: "PasswordChange";
  /**
   * List of errors that occurred executing the mutation.
   */
  errors: PasswordChange_passwordChange_errors[];
}

export interface PasswordChange {
  /**
   * Change the password of the logged in user.
   */
  passwordChange: PasswordChange_passwordChange | null;
}

export interface PasswordChangeVariables {
  newPassword: string;
  oldPassword: string;
}
