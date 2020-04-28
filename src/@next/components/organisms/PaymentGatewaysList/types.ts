import { ICardData, IFormError, IPaymentGateway } from "@types";

export interface IProps {
  /**
   * Available payment gateways.
   */
  paymentGateways: IPaymentGateway[];
  /**
   * Selected payment gateway.
   */
  selectedPaymentGateway?: string;
  /**
   * Selected payment gateway token.
   */
  selectedPaymentGatewayToken?: string;
  /**
   * Called when selected payment gateway with passed the payment gateway name attribute.
   */
  selectPaymentGateway?: (paymentGateway: string) => void;
  /**
   * Form reference on which payment might be submitted.
   */
  formRef?: React.RefObject<HTMLFormElement>;
  /**
   * Form id on which payment might be submitted.
   */
  formId?: string;
  /**
   * Payment gateway errors.
   */
  errors?: IFormError[];
  /**
   * Method called after the form is submitted. Passed gateway name and token attribute will be used to create payment.
   */
  processPayment: (
    gateway: string,
    token: string,
    cardData?: ICardData
  ) => void;
}
