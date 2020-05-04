import { Stripe, StripeElements } from "@stripe/stripe-js";

import { IFormError } from "@types";

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
   * Method called when the form is submitted. Passed token attribute will be used to create payment.
   */
  errors?: IFormError[];
  /**
   * Called when values provided in Stripe elements are submitted.
   */
  onSubmit: (
    stripe: Stripe | null,
    elements: StripeElements | null
  ) => Promise<void>;
}
