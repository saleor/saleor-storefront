/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AddressInput } from "./../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateUserAddress
// ====================================================

export interface UpdateUserAddress_accountAddressUpdate_errors {
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

export interface UpdateUserAddress_accountAddressUpdate_user_defaultShippingAddress_country {
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

export interface UpdateUserAddress_accountAddressUpdate_user_defaultShippingAddress {
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
  country: UpdateUserAddress_accountAddressUpdate_user_defaultShippingAddress_country;
  countryArea: string;
  phone: string | null;
  /**
   * Address is user's default billing address.
   */
  isDefaultBillingAddress: boolean | null;
  /**
   * Address is user's default shipping address.
   */
  isDefaultShippingAddress: boolean | null;
}

export interface UpdateUserAddress_accountAddressUpdate_user_defaultBillingAddress_country {
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

export interface UpdateUserAddress_accountAddressUpdate_user_defaultBillingAddress {
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
  country: UpdateUserAddress_accountAddressUpdate_user_defaultBillingAddress_country;
  countryArea: string;
  phone: string | null;
  /**
   * Address is user's default billing address.
   */
  isDefaultBillingAddress: boolean | null;
  /**
   * Address is user's default shipping address.
   */
  isDefaultShippingAddress: boolean | null;
}

export interface UpdateUserAddress_accountAddressUpdate_user_addresses_country {
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

export interface UpdateUserAddress_accountAddressUpdate_user_addresses {
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
  country: UpdateUserAddress_accountAddressUpdate_user_addresses_country;
  countryArea: string;
  phone: string | null;
  /**
   * Address is user's default billing address.
   */
  isDefaultBillingAddress: boolean | null;
  /**
   * Address is user's default shipping address.
   */
  isDefaultShippingAddress: boolean | null;
}

export interface UpdateUserAddress_accountAddressUpdate_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isStaff: boolean;
  defaultShippingAddress: UpdateUserAddress_accountAddressUpdate_user_defaultShippingAddress | null;
  defaultBillingAddress: UpdateUserAddress_accountAddressUpdate_user_defaultBillingAddress | null;
  /**
   * List of all user's addresses.
   */
  addresses: (UpdateUserAddress_accountAddressUpdate_user_addresses | null)[] | null;
}

export interface UpdateUserAddress_accountAddressUpdate {
  __typename: "AccountAddressUpdate";
  /**
   * List of errors that occurred executing the mutation.
   */
  errors: UpdateUserAddress_accountAddressUpdate_errors[];
  /**
   * A user object for which the address was edited.
   */
  user: UpdateUserAddress_accountAddressUpdate_user | null;
}

export interface UpdateUserAddress {
  /**
   * Updates an address of the logged-in user.
   */
  accountAddressUpdate: UpdateUserAddress_accountAddressUpdate | null;
}

export interface UpdateUserAddressVariables {
  input: AddressInput;
  id: string;
}
