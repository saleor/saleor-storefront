import React from "react";
import OrderRow from "./OrderRow";
import { TypedOrdersByUser } from "./queries";

const OrderHistoryHeader = (
  <div className="orderRow__container">
    <div className="orderRow__container__indexNumber">Index Number</div>
    <div className="orderRow__container__products">Products ordered</div>
    <div className="orderRow__container__date">Date of Order</div>
    <div className="orderRow__container__price">Total value</div>
    <div className="orderRow__container__status">Status</div>
  </div>
);

const OrderHistory: React.FC = () => {
  return (
    <>
      <TypedOrdersByUser variables={{ perPage: 20 }}>
        {({ data: { orders } }) => {
          {
            return (
              <>
                {OrderHistoryHeader}
                {orders.edges.map(order => {
                  return (
                    <OrderRow
                      key={order.node.number}
                      orderId={order.node.id}
                      indexNumber={order.node.number}
                      products={order.node.lines}
                      statusDisplay={order.node.statusDisplay}
                      totalValue={order.node.total.gross.localized}
                      dateOfOrder={order.node.created}
                    />
                  );
                })}
              </>
            );
          }
        }}
      </TypedOrdersByUser>
    </>
  );
};

export default OrderHistory;
