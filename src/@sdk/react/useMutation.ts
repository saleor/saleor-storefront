import { DataProxy } from "apollo-cache";
import { FetchResult } from "apollo-link";
import React from "react";

import { SaleorAPI } from "../index";
import { MutationOptions } from "../mutations";
import { Omit } from "../tsHelpers";
import { useSaleorClient } from "./helpers";
import {
  ApolloErrorWithUserInput,
  Options,
  ReturnData,
  Variables
} from "./types";

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
) => Promise<TData>;

export interface MutationResult<TData> {
  called: boolean;
  data: TData | null;
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
  T extends keyof SaleorAPI,
  TVariables extends Variables<T>,
  TOptions extends Options<T>,
  TData extends ReturnData<T>
>(
  mutation: T,
  baseVariables: TVariables,
  baseOptions: TOptions
): [MutationFn<TData, TVariables>, MutationResult<TData>] => {
  const saleor = useSaleorClient();
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

  const handleMutationComplete = (data: TData, mutationId: number) => {
    if (isMostRecentMutation(mutationId)) {
      setResult(prevState => ({
        ...prevState,
        data,
        loading: false,
      }));
    }
  };

  const runMutation = React.useCallback(
    (variables: TVariables, options: TOptions) => {
      return new Promise(resolve => {
        handleMutationStart();

        const mutationId = generateNewMutationId();
        const apolloVariables = { ...baseVariables, ...variables };

        const apolloOptions = { ...baseOptions, ...options };

        (saleor[mutation] as (variables, options) => Promise<any>)(
          apolloVariables,
          apolloOptions
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
  T extends keyof SaleorAPI,
  TVariables extends Variables<T>,
  TOptions extends Options<T>
>(
  mutation: T
) => (variables?: TVariables, options?: TOptions) =>
  useMutation(mutation, variables, options);