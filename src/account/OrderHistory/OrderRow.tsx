import { mediumScreen } from "../../globalStyles/scss/variables.scss";
import "./scss/OrderRow.scss";

import React from "react";
import Media from "react-media";

import { OrdersByUser_orders_edges_node_lines } from "./types/OrdersByUser";
import OrderedProducts from "./OrderedProducts";
import { Link } from "react-router-dom";

export interface IOrderRow {
  indexNumber: string;
  dateOfOrder: string;
  orderId: string;
  products: OrdersByUser_orders_edges_node_lines[];
  totalValue: string;
  status: string;
}

const OrderRow: React.FC<IOrderRow> = ({
  indexNumber,
  dateOfOrder,
  totalValue,
  status,
  products,
  orderId
}) => (
  <Media
    query={{
      minWidth: mediumScreen
    }}
  >
    {matches => (
      <Link to={`/my-account/order/${orderId}`}>
        <div className="orderRow__container">
          <div className="orderRow__container__indexNumber">{indexNumber}</div>
          {matches ? (
            <>
              <div className="orderRow__container__products">
                <OrderedProducts products={products} />
              </div>
              <div className="orderRow__container__date">
                {dateOfOrder.slice(0, 15)}
              </div>
              <div className="orderRow__container__price">{totalValue}</div>
            </>
          ) : (
            ""
          )}
          <div className="orderRow__container__status">{status}</div>
        </div>
      </Link>
    )}
  </Media>
);

export default OrderRow;
