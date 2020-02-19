import gql from "graphql-tag";

export const addressValidationRules = gql`
  query AddressValidationRules($countryCode: CountryCode!) {
    addressValidationRules(countryCode: $countryCode) {
      allowedFields
      requiredFields
    }
  }
`;
