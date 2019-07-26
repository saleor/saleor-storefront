import React from "react";

import { SaleorAPI } from "../index";
import { useSaleorClient } from "./helpers";
import {
  ApolloErrorWithUserInput,
  Options,
  ReturnData,
  Variables
} from "./types";

const useQuery = <
  T extends keyof SaleorAPI,
  TVariables extends Variables<T>,
  TOptions extends Options<T>,
  TData extends ReturnData<T>
>(
  query: T,
  variables: TVariables = {} as any,
  options: TOptions = {} as any
) => {
  const saleor = useSaleorClient();

  const [data, setData] = React.useState<TData["data"] | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<ApolloErrorWithUserInput | null>(
    null
  );

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await (saleor[query] as any)(variables, options);
        setData((data as any).data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, JSON.stringify(variables), JSON.stringify(options)]);

  return {
    data,
    error,
    loading,
  };
};

export const queryWithVariablesFactory = <T extends keyof SaleorAPI>(
  query: T
) => (variables: Variables<T>, options?: Options<T>) =>
  useQuery(query, variables, options);

export const queryFactory = <T extends keyof SaleorAPI>(query: T) => (
  options?: Options<T>
) => useQuery(query, undefined, options);
