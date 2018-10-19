import gql from "graphql-tag";

export const GET_COUNTRIES_LIST = gql`
  query getCountriesList {
    shop {
      countries {
        code
        country
      }
    }
  }
`;
