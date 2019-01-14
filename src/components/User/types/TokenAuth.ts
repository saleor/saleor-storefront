/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: TokenAuth
// ====================================================

export interface TokenAuth_tokenCreate_errors {
  field: string | null;
  message: string | null;
}

export interface TokenAuth_tokenCreate_user {
  id: string;
  email: string;
  isStaff: boolean;
}

export interface TokenAuth_tokenCreate {
  token: string | null;
  errors: (TokenAuth_tokenCreate_errors | null)[] | null;
  user: TokenAuth_tokenCreate_user | null;
}

export interface TokenAuth {
  tokenCreate: TokenAuth_tokenCreate | null;
}

export interface TokenAuthVariables {
  email: string;
  password: string;
}
