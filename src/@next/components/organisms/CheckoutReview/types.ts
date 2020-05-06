import { IAddress, IFormError } from "@types";

export interface IProps {
  shippingAddress?: IAddress | null;
  billingAddress?: IAddress | null;
  shippingMethodName?: string;
  paymentMethodName?: string;
  email?: string;
  errors?: IFormError[];
}
