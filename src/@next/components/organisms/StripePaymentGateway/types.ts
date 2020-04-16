import { ICardData, IFormError, IPaymentGatewayConfig } from "@types";

export interface IProps {
  /**
   * Payment gateway client configuration.
   */
  config: IPaymentGatewayConfig[];
  /**
   * Payment gateway URL address.
   */
  href: string;
  /**
   * Form reference on which payment might be submitted.
   */
  formRef?: React.RefObject<HTMLFormElement>;
  /**
   * Method called when the form is submitted. Passed token attribute might be used to create payment.
   */
  errors?: IFormError[];
  /**
   * Method called when the form is submitted. Passed token attribute might be used to create payment.
   */
  processPayment: (token: string, cardData: ICardData) => void;
  /**
   * Initially selected status/token
   */
  initialStatus?: string;
}
