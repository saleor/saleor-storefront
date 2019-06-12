import "./scss/OrderHistory.scss";

import React from "react";

import { Button, Loader } from "../../components";
import OrderRow from "./OrderRow";
import { TypedOrdersByUser } from "./queries";

import { OrderHistoryHeader } from "./OrderHistoryHeader";

const OrderHistory: React.FC = () => {
  return (
    <>
      <TypedOrdersByUser variables={{ perPage: 20 }}>
        {({ data, loadMore, loading }) => {
          {
            const handleLoadMore = () =>
              loadMore(
                (prev, next) => ({
                  ...prev,
                  orders: {
                    ...prev.orders,
                    edges: [...prev.orders.edges, ...next.orders.edges],
                    pageInfo: next.orders.pageInfo
                  }
                }),
                { after: data.orders.pageInfo.endCursor }
              );

            return (
              <div className="order-history__container">
                <OrderHistoryHeader />
                {data.orders.edges.map(order => {
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
                <div className="order-history__container__loadMore__button">
                  {loading ? (
                    <Loader />
                  ) : (
                    data.orders.pageInfo.hasNextPage && (
                      <Button secondary onClick={handleLoadMore}>
                        Load more orders
                      </Button>
                    )
                  )}
                </div>
              </div>
            );
          }
        }}
      </TypedOrdersByUser>
    </>
  );
};

export default OrderHistory;
