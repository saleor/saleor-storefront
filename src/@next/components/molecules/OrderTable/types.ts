import { OrdersByUser_me_orders_edges } from "@saleor/sdk/lib/queries/gqlTypes/OrdersByUser";

export interface IProps {
  orders: OrdersByUser_me_orders_edges[];
  isGuest: boolean;
}
