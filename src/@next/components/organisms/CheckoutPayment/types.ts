import { ICardData, IFormError, IPaymentGateway } from "@types";

export interface IPromoCodeDiscount {
  voucherCode?: string | null;
}

export interface IProps {
  gatewayErrors?: IFormError[];
  promoCodeErrors?: IFormError[];
  paymentGateways: IPaymentGateway[];
  promoCodeDiscount?: IPromoCodeDiscount;
  promoCodeDiscountFormRef?: React.RefObject<HTMLFormElement>;
  promoCodeDiscountFormId?: string;
  addPromoCode: (promoCode: string) => void;
  removeVoucherCode: (voucherCode: string) => void;
  submitUnchangedDiscount: () => void;
  /**
   * Called when selected payment gateway is changed.
   */
  selectPaymentGateway: (paymentGateway: string) => void;
  /**
   * Method called after the form is submitted. Passed gateway id and token attribute will be used to create payment.
   */
  processPayment: (
    gateway: string,
    token: string,
    cardData?: ICardData
  ) => void;
  /**
   * Method called when gateway error occured.
   */
  onGatewayError: (errors: IFormError[]) => void;
}
