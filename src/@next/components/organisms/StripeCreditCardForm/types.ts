export interface IProps {
  /**
   * Form reference on which payment might be submitted.
   */
  formRef?: React.RefObject<HTMLFormElement>;
  /**
   * Method called when the form is submitted. Passed token attribute might be used to create payment.
   */
  processPayment: (token: string) => void;
}
