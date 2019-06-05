import React from "react";

export interface IOrderRow {
  indexNumber: string;
  dateOfOrder: string;
  totalValue: string;
  status: string;
}

const OrderRow: React.FC<IOrderRow> = ({
  indexNumber,
  dateOfOrder,
  totalValue,
  status
}) => (
  <div>
    <div>{indexNumber}</div>
    <div>{dateOfOrder}</div>
    <div>{totalValue}</div>
    <div>{status}</div>
  </div>
);

export default OrderRow;
