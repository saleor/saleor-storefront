import { OrderStatus } from "gqlTypes/globalTypes";

export interface IProps {
  orderStatus: OrderStatus;
  orderNumber: string;
  continueShopping: () => void;
  orderDetails: () => void;
}
