export interface IProps {
  /**
   * Method called after the form is submitted. Passed token attribute will be used to create payment.
   */
  config: {
    field: string;
    value: string;
  }[];
  processPayment: (token: string) => void;
}
