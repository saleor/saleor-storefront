export interface IProps {
  /**
   * Method called after the form is submitted. Passed token attribute will be used to create payment.
   */
  processPayment: (token: string) => void;
}
