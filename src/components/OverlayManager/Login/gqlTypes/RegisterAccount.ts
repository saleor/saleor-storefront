/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RegisterAccount
// ====================================================

export interface RegisterAccount_accountRegister_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface RegisterAccount_accountRegister {
  __typename: "AccountRegister";
  errors: RegisterAccount_accountRegister_errors[];
  requiresConfirmation: boolean | null;
}

export interface RegisterAccount {
  accountRegister: RegisterAccount_accountRegister | null;
}

export interface RegisterAccountVariables {
  email: string;
  password: string;
  redirectUrl: string;
}
