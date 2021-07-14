import { CompleteCheckout_checkoutComplete_order } from "@saleor/sdk/lib/mutations/gqlTypes/CompleteCheckout";

import { IFormError } from "@types";

export interface IPaymentGatewayConfig {
  /**
   * Gateway config key.
   */
  field: string;
  /**
   * Gateway config value for key.
   */
  value: string | null;
}

export interface IPaymentGateway {
  /**
   * Payment gateway ID.
   */
  id: string;
  /**
   * Payment gateway name.
   */
  name: string;
  /**
   * Payment gateway client configuration.
   */
  config: IPaymentGatewayConfig[];
}

export interface IPaymentSubmitResult {
  confirmationData?: string | null;
  confirmationNeeded?: boolean;
  order?: CompleteCheckout_checkoutComplete_order | null;
  errors?: IFormError[];
}
