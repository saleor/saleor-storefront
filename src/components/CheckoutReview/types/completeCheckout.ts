/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: completeCheckout
// ====================================================

export interface completeCheckout_checkoutComplete_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface completeCheckout_checkoutComplete_order {
  __typename: "Order";
  id: string;
}

export interface completeCheckout_checkoutComplete {
  __typename: "CheckoutComplete";
  errors: (completeCheckout_checkoutComplete_errors | null)[] | null;
  order: completeCheckout_checkoutComplete_order | null;
}

export interface completeCheckout {
  checkoutComplete: completeCheckout_checkoutComplete | null;
}

export interface completeCheckoutVariables {
  checkoutId: string;
}
