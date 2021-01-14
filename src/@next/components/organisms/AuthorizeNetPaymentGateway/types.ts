import { IPaymentGatewayConfig } from "@types";

export interface IProps {
  /**
   * Method called after the form is submitted. Passed token attribute will be used to create payment.
   */
  config: IPaymentGatewayConfig[];
  processPayment: (token: string) => void;
}
