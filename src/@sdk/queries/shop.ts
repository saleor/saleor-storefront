import gql from "graphql-tag";

export const getShop = gql`
  query GetShop {
    shop {
      displayGrossPrices
      defaultCountry {
        code
        country
      }
      countries {
        country
        code
      }
      geolocalization {
        country {
          code
          country
        }
      }
    }
  }
`;
