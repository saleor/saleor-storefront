/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AccountConfirm
// ====================================================

export interface AccountConfirm_confirmAccount_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface AccountConfirm_confirmAccount {
  __typename: "ConfirmAccount";
  errors: AccountConfirm_confirmAccount_errors[];
}

export interface AccountConfirm {
  confirmAccount: AccountConfirm_confirmAccount | null;
}

export interface AccountConfirmVariables {
  email: string;
  token: string;
}
