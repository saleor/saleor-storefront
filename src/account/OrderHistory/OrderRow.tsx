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
  statusDisplay: string;
}

const addZero = (num: number): string => {
  return ("0" + num).slice(-2);
};

const formatData = (dateOfOrder: string): string => {
  const date = new Date(dateOfOrder);

  const da = `${date.getFullYear()}-${addZero(date.getMonth())}-${addZero(
    date.getDay()
  )} ${addZero(date.getHours())}:${addZero(date.getMinutes())}`;
  return da;
};

const OrderRow: React.FC<IOrderRow> = ({
  indexNumber,
  dateOfOrder,
  totalValue,
  statusDisplay,
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
              {formatData(dateOfOrder)}
            </div>
            <div className="orderRow__container__price">{totalValue}</div>
          </>
        ) : (
          ""
        )}
        <div className="orderRow__container__status">{statusDisplay}</div>
      </div>
    )}
  </Media>
);

export default withRouter(OrderRow);
