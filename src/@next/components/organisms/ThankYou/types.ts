import { OrderStatus } from "@saleor/sdk";
import { UrlObject } from "url";

export interface IProps {
  orderStatus: OrderStatus;
  orderNumber: string;
  continueShoppingUrl: string | UrlObject;
  orderDetailsUrl: string | UrlObject;
}
