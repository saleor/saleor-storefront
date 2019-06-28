import { ApolloQueryResult } from "apollo-client";
import React from "react";

import { QUERIES, SQueryOptions } from "../queries";
import { useSaleorClient } from "./context";

type InferData<T> = T extends Promise<ApolloQueryResult<infer D>> ? D : T;
type ResponseData<N extends keyof QUERIES, T extends QUERIES[N]> = InferData<
  ReturnType<T>
>;

type InferVariables<N extends keyof QUERIES, T extends QUERIES[N]> = T extends (
  c,
  o: infer O
) => any
  ? O extends { variables }
    ? O
    : never
  : {};

const useQuery = <N extends keyof QUERIES, T extends QUERIES[N]>(
  query: T,
  options
) => {
  const client = useSaleorClient();

  const [data, setData] = React.useState<ResponseData<N, T>>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await (query as any)(client, options);

        setData(data.data as ResponseData<N, T>);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, options]);

  return {
    data,
    error,
    loading,
  };
};

const queryWithVariablesFactory = <
  N extends keyof QUERIES,
  T extends QUERIES[N]
>(
  query: T
) => (options: InferVariables<N, T>) => useQuery(query, options);

const queryFactory = <N extends keyof QUERIES, T extends QUERIES[N]>(
  query: T
) => (options: SQueryOptions = {}) => useQuery(query, options);

// query hooks
export const useProductDetails = queryWithVariablesFactory(
  QUERIES.ProductDetails
);
