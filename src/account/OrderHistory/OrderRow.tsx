import { mediumScreen } from "../../globalStyles/scss/variables.scss";
import "./scss/OrderRow.scss";

import React from "react";
import Media from "react-media";

import { OrdersByUser_orders_edges_node_lines } from "./types/OrdersByUser";
import OrderedProducts from "./OrderedProducts";

export interface IOrderRow {
  indexNumber: string;
  dateOfOrder: string;
  products: OrdersByUser_orders_edges_node_lines[];
  totalValue: string;
  status: string;
}

const OrderRow: React.FC<IOrderRow> = ({
  indexNumber,
  dateOfOrder,
  totalValue,
  status,
  products
}) => (
  <Media
    query={{
      minWidth: mediumScreen
    }}
  >
    {matches => (
      <div className="orderRow__container">
        <div className="orderRow__container__indexNumber">{indexNumber}</div>
        {matches ? (
          <>
            <div className="orderRow__container__products">
              <OrderedProducts products={products} />
            </div>
            <div className="orderRow__container__date">{dateOfOrder}</div>
            <div className="orderRow__container__price">{totalValue}</div>
          </>
        ) : (
          ""
        )}

        <div className="orderRow__container__status">{status}</div>
      </div>
    )}
  </Media>
);

export default OrderRow;
