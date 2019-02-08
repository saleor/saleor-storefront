/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Address
// ====================================================

export interface Address_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface Address {
  __typename: "Address";
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: Address_country;
  countryArea: string;
  phone: string | null;
}
