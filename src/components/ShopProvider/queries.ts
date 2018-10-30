import gql from "graphql-tag";

export const GET_SHOP = gql`
  query getShop {
    shop {
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
