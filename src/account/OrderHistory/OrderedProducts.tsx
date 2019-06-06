import React from "react";
import ThumbnailUrl from "./ThumbnailUrl";
import { OrdersByUser_orders_edges_node_lines } from "./types/OrdersByUser";

export interface IOrderedProducts {
  products: OrdersByUser_orders_edges_node_lines[];
}

const OrderedProducts: React.FC<IOrderedProducts> = ({ products }) => {
  return (
    <>
      {products.slice(0, 5).map((product, index) => (
        <ThumbnailUrl key={index} line={product} />
      ))}
    </>
  );
};

export default OrderedProducts;
