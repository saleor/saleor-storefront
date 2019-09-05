import { useOrdersByUser } from "@sdk/react/";
import React from "react";

import { Loader } from "@components/atoms";
import { OrderTabel } from "@components/molecules";

import { IProps } from "./types";

export const OrdersHistory: React.FC<IProps> = ({ history }: IProps) => {
  const { data, loading } = useOrdersByUser({
    perPage: 20,
  });

  return loading || !data ? (
    <Loader />
  ) : (
    <OrderTabel orders={data.edges} history={history} />
  );
};
