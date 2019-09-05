import React from "react";

import { useOrdersByUser } from "@sdk/react";
import { IProps } from "./types";

export const OrdersHistory: React.FC<IProps> = ({

}: // destructure props here if needed
IProps) => {
  const { data, loading } = useOrdersByUser({ perPage: 20 });
  return (
    <>
      {data ? JSON.stringify(data) : ""}
      {loading ? "true" : "false"}
      ppppp
    </>
  );
};
