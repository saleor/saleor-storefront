import gql from "graphql-tag";

export const UPDATE_CHECKOUT_SHIPPING_OPTION = gql`
  mutation updateCheckoutShippingOptions(
    $checkoutId: ID!
    $shippingMethodId: ID!
  ) {
    checkoutShippingMethodUpdate(
      checkoutId: $checkoutId
      shippingMethodId: $shippingMethodId
    ) {
      errors {
        field
        message
      }
    }
  }
`;
