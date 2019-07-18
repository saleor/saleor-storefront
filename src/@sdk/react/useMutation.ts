import { DataProxy } from "apollo-cache";
import { OperationVariables } from "apollo-client";
import { FetchResult } from "apollo-link";
import React from "react";

import { SaleorAPI } from "../index";
import { MutationOptions, MUTATIONS } from "../mutations";
import { InferOptions, NestedData, Omit, QueryData } from "../tsHelpers";
import { useSaleorClient } from "./helpers";
import { ApolloErrorWithUserInput } from "./types";

type MutationUpdaterFn<TData = Record<string, any>> = (
  proxy: DataProxy,
  mutationResult: FetchResult<TData>
) => void;

export interface BaseMutationHookOptions<TData, TVariables>
  extends Omit<MutationOptions<TData, TVariables>, "update"> {
  update?: MutationUpdaterFn<TData>;
}

export type MutationFn<TData, TVariables> = (
  variables?: TVariables,
  options?: BaseMutationHookOptions<TData, never>
) => Promise<NestedData<TData>>;

export interface MutationResult<TData> {
  called: boolean;
  data: NestedData<TData> | null;
  error: ApolloErrorWithUserInput | null;
  loading: boolean;
}

// keep track of called mutation
const useMutationTracking = (() => {
  let _mutationId = 0;

  const generateNewMutationId = (): number => {
    _mutationId += 1;
    return _mutationId;
  };

  const isMostRecentMutation = (mutationId: number) => {
    return _mutationId === mutationId;
  };

  return () => ({
    generateNewMutationId,
    isMostRecentMutation,
  });
})();

const initialState: MutationResult<any> = {
  called: false,
  data: null,
  error: null,
  loading: false,
};

const useMutation = <
  TType extends keyof MUTATIONS,
  TData,
  TVariables = OperationVariables
>(
  mutation: any,
  baseVariables: TVariables,
  baseOptions: BaseMutationHookOptions<TData, never> = {}
): [MutationFn<TData, TVariables>, MutationResult<TData>] => {
  const client = useSaleorClient();
  const { generateNewMutationId, isMostRecentMutation } = useMutationTracking();
  const [result, setResult] = React.useState<MutationResult<TData>>(
    initialState
  );

  const handleMutationStart = () => {
    if (!result.loading) {
      setResult({
        called: true,
        data: null,
        error: null,
        loading: true,
      });
    }
  };

  const handleMutationError = (
    error: ApolloErrorWithUserInput,
    mutationId: number
  ) => {
    if (isMostRecentMutation(mutationId)) {
      setResult(prevState => ({
        ...prevState,
        error,
        loading: false,
      }));
    }
  };

  const handleMutationComplete = (
    data: NestedData<TData>,
    mutationId: number
  ) => {
    if (isMostRecentMutation(mutationId)) {
      setResult(prevState => ({
        ...prevState,
        data,
        loading: false,
      }));
    }
  };

  const runMutation = React.useCallback(
    (
      variables: TVariables,
      options: MutationOptions<TData, TVariables> = {}
    ) => {
      return new Promise(resolve => {
        handleMutationStart();

        const mutationId = generateNewMutationId();
        const apolloVariables = { ...baseVariables, ...variables };

        const apolloOptions = { ...baseOptions, ...options };

        SaleorAPI.fireQuery<MUTATIONS, TType>(client, mutation)(
          apolloVariables as any,
          apolloOptions as any
        )
          .then(data => {
            handleMutationComplete(data, mutationId);
            resolve(data);
          })
          .catch(err => {
            handleMutationError(err, mutationId);
            resolve(null);
          });
      });
    },
    [mutation, baseOptions]
  ) as MutationFn<TData, TVariables>;

  return [runMutation, result];
};

export const mutationFactory = <
  N extends keyof MUTATIONS,
  T extends MUTATIONS[N],
  TData extends QueryData<T>
>(
  mutation: T
) => (
  variables: InferOptions<T>["variables"],
  options?: BaseMutationHookOptions<TData, never>
) =>
  useMutation<N, TData, InferOptions<T>["variables"]>(
    mutation,
    variables,
    options
  );
