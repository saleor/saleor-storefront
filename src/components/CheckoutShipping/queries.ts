import gql from "graphql-tag";

export const UPDATE_CHECKOUT_SHIPPING_ADDRESS = gql`
  mutation updateCheckoutShippingAddress(
    $checkoutId: ID!
    $shippingAddress: AddressInput!
  ) {
    checkoutShippingAddressUpdate(
      checkoutId: $checkoutId
      shippingAddress: $shippingAddress
    ) {
      errors {
        field
        message
      }
    }
  }
`;

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
