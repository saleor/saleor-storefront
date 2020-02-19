/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CountryCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: AddressValidationRules
// ====================================================

export interface AddressValidationRules_addressValidationRules {
  __typename: "AddressValidationData";
  allowedFields: (string | null)[] | null;
  requiredFields: (string | null)[] | null;
}

export interface AddressValidationRules {
  /**
   * Returns address validation rules.
   */
  addressValidationRules: AddressValidationRules_addressValidationRules | null;
}

export interface AddressValidationRulesVariables {
  countryCode: CountryCode;
}
