import { ApolloQueryResult } from "apollo-client";
import React from "react";

import { SaleorAPI } from "../index";
import { QUERIES } from "../queries";
import { InferOptions, NestedData } from "../tsHelpers";
import { useSaleorClient } from "./helpers";
import { ApolloErrorWithUserInput } from "./types";

type InferData<T> = T extends Promise<ApolloQueryResult<infer D>>
  ? NestedData<D>
  : T;
type ResponseData<N extends keyof QUERIES, T extends QUERIES[N]> = InferData<
  ReturnType<T>
>;

const useQuery = <N extends keyof QUERIES, T extends QUERIES[N]>(
  query: T,
  variables: InferOptions<T>["variables"],
  options?: Omit<InferOptions<T>, "variables">
) => {
  const client = useSaleorClient();

  const [data, setData] = React.useState<ResponseData<N, T>>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<ApolloErrorWithUserInput>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await SaleorAPI.fireQuery<QUERIES, N>(client, query)(
          variables,
          options
        );
        setData(data);
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

export const queryWithVariablesFactory = <
  N extends keyof QUERIES,
  T extends QUERIES[N]
>(
  query: T
) => (
  variables: InferOptions<T>["variables"],
  options?: Omit<InferOptions<T>, "variables">
) => useQuery(query, variables, options);

export const queryFactory = <N extends keyof QUERIES, T extends QUERIES[N]>(
  query: T
) => (options?: Omit<InferOptions<T>, "variables">) =>
  useQuery(query, undefined, options);
