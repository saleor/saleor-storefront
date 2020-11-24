import { OrderStatus } from "@saleor/sdk";

export interface IProps {
  orderStatus: OrderStatus;
  orderNumber: string;
  continueShopping: () => void;
  orderDetails: () => void;
}
