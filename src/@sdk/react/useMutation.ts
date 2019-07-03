import { DataProxy } from "apollo-cache";
import { ApolloError, OperationVariables } from "apollo-client";
import { FetchResult } from "apollo-link";
import { GraphQLError } from "graphql";
import React from "react";

import { MutationOptions, MUTATIONS } from "../mutations";
import { Omit } from "../tsHelpers";
import { useSaleorClient } from "./context";

type MutationUpdaterFn<TData = Record<string, any>> = (
  proxy: DataProxy,
  mutationResult: FetchResult<TData>
) => void;

interface BaseMutationHookOptions<TData, TVariables>
  extends Omit<MutationOptions<TData, TVariables>, "update"> {
  update?: MutationUpdaterFn<TData>;
}

type MutationFn<TData, TVariables> = (
  options?: BaseMutationHookOptions<TData, TVariables>
) => Promise<FetchResult<TData>>;

type InferVariables<
  N extends keyof MUTATIONS,
  T extends MUTATIONS[N]
> = T extends (c, o: infer O) => any ? O : {};

interface MutationResult<TData> {
  called: boolean;
  data: TData | null;
  error: ApolloError | null;
  loading: boolean;
}

interface ExecutionResult<T = Record<string, any>> {
  data?: T;
  extensions?: Record<string, any>;
  errors?: GraphQLError[];
}

interface Error extends ApolloError {
  extraInfo: string;
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

// errors are nested in data as it currently stands in the API
// this helper extracts all errors present
const getErrorsFromData = data => {
  try {
    const error = Object.keys(data).reduce((acc, key) => {
      return {
        ...acc,
        ...(data[key].errors &&
          !!data[key].errors.length && { [key]: data[key].errors }),
      };
    }, {});

    return !!Object.keys(error).length ? error : null;
  } catch (e) {
    // set global error when data is not an object
    return { global: true };
  }
};

const useMutation = <TData, TVariables = OperationVariables>(
  mutation: any,
  baseOptions: BaseMutationHookOptions<TData, TVariables> = {}
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

  const handleMutationError = (error: ApolloError, mutationId: number) => {
    if (isMostRecentMutation(mutationId)) {
      setResult(prevState => ({
        ...prevState,
        error,
        loading: false,
      }));
    }
  };

  const handleMutationComplete = (
    response: ExecutionResult<TData>,
    mutationId: number
  ) => {
    const { data } = response;
    const errors = getErrorsFromData(data);

    if (errors) {
      handleMutationError(new ApolloError({ extraInfo: errors }), mutationId);
      return;
    }

    if (isMostRecentMutation(mutationId)) {
      setResult(prevState => ({
        ...prevState,
        data,
        loading: false,
      }));
    }
  };

  const runMutation = React.useCallback(
    (options: MutationOptions<TData, TVariables> = {}) => {
      return new Promise(resolve => {
        handleMutationStart();

        const mutationId = generateNewMutationId();
        const variables = baseOptions.variables
          ? { ...options.variables, ...baseOptions.variables }
          : options.variables;

        mutation(client, {
          ...baseOptions,
          ...options,
          variables,
        })
          .then(response => {
            handleMutationComplete(response, mutationId);
            resolve(response as ExecutionResult<TData>);
          })
          .catch(err => {
            handleMutationError(err, mutationId);
            resolve({});
          });
      });
    },
    [mutation, baseOptions]
  );

  return [runMutation, result];
};

export const mutationFactory = <
  N extends keyof MUTATIONS,
  T extends MUTATIONS[N]
>(
  mutation: T
) => (options?: InferVariables<N, T>) => useMutation(mutation, options);
