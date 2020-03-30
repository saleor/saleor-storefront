import { IAddress } from "@types";

export interface IProps {
  shippingAddress?: IAddress | null;
  billingAddress?: IAddress | null;
  email?: string;
}
