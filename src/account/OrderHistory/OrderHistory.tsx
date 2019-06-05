import React from "react";
import { TypedOrdersByUser } from "./queries";

const OrderHistory: React.FC = () => {
  return (
    <TypedOrdersByUser>
      {({ data: { orders } }) => {
        return <div>blablabla</div>;
      }}
    </TypedOrdersByUser>
  );
};

export default OrderHistory;
