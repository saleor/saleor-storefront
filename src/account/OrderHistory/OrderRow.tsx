import { mediumScreen } from "../../globalStyles/scss/variables.scss";
import "./scss/OrderRow.scss";

import React from "react";
import Media from "react-media";

import { RouteComponentProps, withRouter } from "react-router-dom";
import OrderedProducts from "./OrderedProducts";
import { OrdersByUser_orders_edges_node_lines } from "./types/OrdersByUser";

export interface IOrderRow extends RouteComponentProps {
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
  orderId,
  history
}) => (
  <Media
    query={{
      minWidth: mediumScreen
    }}
  >
    {matches => (
      <div
        className="orderRow__container"
        onClick={evt => {
          evt.stopPropagation();
          history.push(`/my-account/order/${orderId}`);
        }}
      >
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
    )}
  </Media>
);

export default withRouter(OrderRow);
