/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: completeCheckout
// ====================================================

export interface completeCheckout_checkoutComplete_errors {
  __typename: "Error";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
}

export interface completeCheckout_checkoutComplete_order {
  __typename: "Order";
  /**
   * The ID of the object.
   */
  id: string;
  token: string;
}

export interface completeCheckout_checkoutComplete {
  __typename: "CheckoutComplete";
  /**
   * List of errors that occurred executing the mutation.
   */
  errors: completeCheckout_checkoutComplete_errors[] | null;
  /**
   * Placed order.
   */
  order: completeCheckout_checkoutComplete_order | null;
}

export interface completeCheckout {
  /**
   * Completes the checkout. As a result a new order is created and a payment
   * charge is made. This action requires a successful payment before it can be
   * performed. In case additional confirmation step as 3D secure is required
   * confirmationNeeded flag will be set to True and no order created until payment
   * is confirmed with second call of this mutation.
   */
  checkoutComplete: completeCheckout_checkoutComplete | null;
}

export interface completeCheckoutVariables {
  checkoutId: string;
}
