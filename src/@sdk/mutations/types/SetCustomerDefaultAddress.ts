/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AddressTypeEnum } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: SetCustomerDefaultAddress
// ====================================================

export interface SetCustomerDefaultAddress_accountSetDefaultAddress_errors {
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

export interface SetCustomerDefaultAddress_accountSetDefaultAddress_user_defaultShippingAddress_country {
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

export interface SetCustomerDefaultAddress_accountSetDefaultAddress_user_defaultShippingAddress {
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
  country: SetCustomerDefaultAddress_accountSetDefaultAddress_user_defaultShippingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface SetCustomerDefaultAddress_accountSetDefaultAddress_user_defaultBillingAddress_country {
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

export interface SetCustomerDefaultAddress_accountSetDefaultAddress_user_defaultBillingAddress {
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
  country: SetCustomerDefaultAddress_accountSetDefaultAddress_user_defaultBillingAddress_country;
  countryArea: string;
  phone: string | null;
}

export interface SetCustomerDefaultAddress_accountSetDefaultAddress_user_addresses_country {
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

export interface SetCustomerDefaultAddress_accountSetDefaultAddress_user_addresses {
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
  country: SetCustomerDefaultAddress_accountSetDefaultAddress_user_addresses_country;
  countryArea: string;
  phone: string | null;
}

export interface SetCustomerDefaultAddress_accountSetDefaultAddress_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isStaff: boolean;
  defaultShippingAddress: SetCustomerDefaultAddress_accountSetDefaultAddress_user_defaultShippingAddress | null;
  defaultBillingAddress: SetCustomerDefaultAddress_accountSetDefaultAddress_user_defaultBillingAddress | null;
  /**
   * List of all user's addresses.
   */
  addresses: (SetCustomerDefaultAddress_accountSetDefaultAddress_user_addresses | null)[] | null;
}

export interface SetCustomerDefaultAddress_accountSetDefaultAddress {
  __typename: "AccountSetDefaultAddress";
  /**
   * List of errors that occurred executing the mutation.
   */
  errors: SetCustomerDefaultAddress_accountSetDefaultAddress_errors[] | null;
  /**
   * An updated user instance.
   */
  user: SetCustomerDefaultAddress_accountSetDefaultAddress_user | null;
}

export interface SetCustomerDefaultAddress {
  /**
   * Sets a default address for the authenticated user.
   */
  accountSetDefaultAddress: SetCustomerDefaultAddress_accountSetDefaultAddress | null;
}

export interface SetCustomerDefaultAddressVariables {
  id: string;
  type: AddressTypeEnum;
}
