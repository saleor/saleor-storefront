export interface ICardData {
  /**
   * Card brand.
   */
  brand?: string;
  /**
   * The host name of the domain.
   */
  firstDigits?: string;
  /**
   * Last 4 digits of the card number.
   */
  lastDigits?: string;
  /**
   * Two-digit number representing the card’s expiration month.
   */
  expMonth?: number;
  /**
   * Four-digit number representing the card’s expiration year.
   */
  expYear?: number;
}
