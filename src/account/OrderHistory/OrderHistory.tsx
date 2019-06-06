import React from "react";
import OrderRow from "./OrderRow";
import { TypedOrdersByUser } from "./queries";

const OrderHistory: React.FC = () => {
  return (
    <>
      <TypedOrdersByUser>
        {({ data: { orders } }) => {
          {
            return orders.edges.map(order => {
              return (
                <OrderRow
                  key={order.node.number}
                  indexNumber={order.node.number}
                  products={order.node.lines}
                  status={order.node.status}
                  totalValue={order.node.total.gross.localized}
                  dateOfOrder={order.node.created}
                />
              );
            });
          }
        }}
      </TypedOrdersByUser>
    </>
  );
};

export default OrderHistory;
