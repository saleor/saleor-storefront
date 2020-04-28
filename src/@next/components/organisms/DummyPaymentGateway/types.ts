export interface IProps {
  /**
   * Form reference on which payment might be submitted.
   */
  formRef?: React.RefObject<HTMLFormElement>;
  /**
   * Form id on which payment might be submitted.
   */
  formId?: string;
  /**
   * Method called after the form is submitted. Passed token attribute will be used to create payment.
   */
  processPayment: (token: string) => void;
  /**
   * Initially selected status/token
   */
  initialStatus?: string;
}
