/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AddressTypeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: SetCustomerDefaultAddress
// ====================================================

export interface SetCustomerDefaultAddress_addressSetDefault_errors {
  __typename: "Error";
  /**
   * Name of a field that caused the error. A value of
   *         `null` indicates that the error isn't associated with a particular
   *         field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
}

export interface SetCustomerDefaultAddress_addressSetDefault_user_defaultShippingAddress_country {
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

export interface SetCustomerDefaultAddress_addressSetDefault_user_defaultShippingAddress {
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
   * Default shop's country
   */
  country: SetCustomerDefaultAddress_addressSetDefault_user_defaultShippingAddress_country;
  countryArea: string;
  phone: string | null;
  /**
   * Address is user's default billing address
   */
  isDefaultBillingAddress: boolean | null;
  /**
   * Address is user's default shipping address
   */
  isDefaultShippingAddress: boolean | null;
}

export interface SetCustomerDefaultAddress_addressSetDefault_user_defaultBillingAddress_country {
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

export interface SetCustomerDefaultAddress_addressSetDefault_user_defaultBillingAddress {
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
   * Default shop's country
   */
  country: SetCustomerDefaultAddress_addressSetDefault_user_defaultBillingAddress_country;
  countryArea: string;
  phone: string | null;
  /**
   * Address is user's default billing address
   */
  isDefaultBillingAddress: boolean | null;
  /**
   * Address is user's default shipping address
   */
  isDefaultShippingAddress: boolean | null;
}

export interface SetCustomerDefaultAddress_addressSetDefault_user_addresses_country {
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

export interface SetCustomerDefaultAddress_addressSetDefault_user_addresses {
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
   * Default shop's country
   */
  country: SetCustomerDefaultAddress_addressSetDefault_user_addresses_country;
  countryArea: string;
  phone: string | null;
  /**
   * Address is user's default billing address
   */
  isDefaultBillingAddress: boolean | null;
  /**
   * Address is user's default shipping address
   */
  isDefaultShippingAddress: boolean | null;
}

export interface SetCustomerDefaultAddress_addressSetDefault_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isStaff: boolean;
  defaultShippingAddress: SetCustomerDefaultAddress_addressSetDefault_user_defaultShippingAddress | null;
  defaultBillingAddress: SetCustomerDefaultAddress_addressSetDefault_user_defaultBillingAddress | null;
  /**
   * List of all user's addresses.
   */
  addresses: (SetCustomerDefaultAddress_addressSetDefault_user_addresses | null)[] | null;
}

export interface SetCustomerDefaultAddress_addressSetDefault {
  __typename: "AddressSetDefault";
  /**
   * List of errors that occurred executing the mutation.
   */
  errors: SetCustomerDefaultAddress_addressSetDefault_errors[] | null;
  /**
   * An updated user instance.
   */
  user: SetCustomerDefaultAddress_addressSetDefault_user | null;
}

export interface SetCustomerDefaultAddress {
  /**
   * Sets a default address for the given user.
   */
  addressSetDefault: SetCustomerDefaultAddress_addressSetDefault | null;
}

export interface SetCustomerDefaultAddressVariables {
  addressId: string;
  userId: string;
  type: AddressTypeEnum;
}
