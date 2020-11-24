import { OrderStatus } from "@saleor/sdk/lib/gqlTypes/globalTypes";

export interface IProps {
  orderStatus: OrderStatus;
  orderNumber: string;
  continueShopping: () => void;
  orderDetails: () => void;
}
