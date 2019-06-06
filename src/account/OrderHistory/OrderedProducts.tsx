import React from "react";
import ThumbnailUrl from "./ThumbnailUrl";
import { OrdersByUser_orders_edges_node_lines } from "./types/OrdersByUser";

export interface IOrderedProducts {
  products: OrdersByUser_orders_edges_node_lines[];
}

const OrderedProducts: React.FC<IOrderedProducts> = ({ products }) => {
  return <ThumbnailUrl line={products[0]} />;
};

export default OrderedProducts;
