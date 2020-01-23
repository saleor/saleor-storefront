/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AccountInput } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: AccountUpdate
// ====================================================

export interface AccountUpdate_accountUpdate_errors {
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

export interface AccountUpdate_accountUpdate_user_defaultShippingAddress_country {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code: string;
  /**
   * Country name.
   */
  country: string;
}

export interface AccountUpdate_accountUpdate_user_defaultShippingAddress {
  __typename: "Address";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: AccountUpdate_accountUpdate_user_defaultShippingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface AccountUpdate_accountUpdate_user_defaultBillingAddress_country {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code: string;
  /**
   * Country name.
   */
  country: string;
}

export interface AccountUpdate_accountUpdate_user_defaultBillingAddress {
  __typename: "Address";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: AccountUpdate_accountUpdate_user_defaultBillingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface AccountUpdate_accountUpdate_user_addresses_country {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code: string;
  /**
   * Country name.
   */
  country: string;
}

export interface AccountUpdate_accountUpdate_user_addresses {
  __typename: "Address";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: AccountUpdate_accountUpdate_user_addresses_country;
  countryArea: string;
  phone: string | null;
}

export interface AccountUpdate_accountUpdate_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isStaff: boolean;
  defaultShippingAddress: AccountUpdate_accountUpdate_user_defaultShippingAddress | null;
  defaultBillingAddress: AccountUpdate_accountUpdate_user_defaultBillingAddress | null;
  /**
   * List of all user's addresses.
   */
  addresses: (AccountUpdate_accountUpdate_user_addresses | null)[] | null;
}

export interface AccountUpdate_accountUpdate {
  __typename: "AccountUpdate";
  /**
   * List of errors that occurred executing the mutation.
   */
  errors: AccountUpdate_accountUpdate_errors[] | null;
  user: AccountUpdate_accountUpdate_user | null;
}

export interface AccountUpdate {
  /**
   * Updates the account of the logged-in user.
   */
  accountUpdate: AccountUpdate_accountUpdate | null;
}

export interface AccountUpdateVariables {
  input: AccountInput;
}
