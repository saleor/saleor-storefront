/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Payment
// ====================================================

export interface Payment_creditCard {
  __typename: "CreditCard";
  /**
   * Card brand.
   */
  brand: string;
  /**
   * The host name of the domain.
   */
  firstDigits: string;
  /**
   * Last 4 digits of the card number.
   */
  lastDigits: string;
  /**
   * Two-digit number representing the card’s expiration month.
   */
  expMonth: number;
  /**
   * Four-digit number representing the card’s expiration year.
   */
  expYear: number;
}

export interface Payment {
  __typename: "Payment";
  /**
   * The ID of the object.
   */
  id: string;
  gateway: string;
  token: string;
  /**
   * The details of the card used for this payment.
   */
  creditCard: Payment_creditCard | null;
}
