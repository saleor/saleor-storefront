import { ICardData, IFormError } from "@types";

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
   * Method called when the form is submitted. Passed token attribute might be used to create payment.
   */
  errors?: IFormError[];
  /**
   * Method called when the form is submitted. Passed gateway name and token attribute might be used to create payment.
   */
  processPayment: (token: string, cardData: ICardData) => void;
}
