import { ApolloError, MutationUpdaterFn, FetchPolicy } from "apollo-client";
import { DocumentNode } from "graphql";
import * as React from "react";
import { Mutation, MutationFn, MutationResult } from "react-apollo";

export interface TypedMutationInnerProps<TData, TVariables> {
  children: (
    mutateFn: MutationFn<TData, TVariables>,
    result: MutationResult<TData>
  ) => React.ReactNode;
  onCompleted?: (data: TData) => void;
  onError?: (error: ApolloError) => void;
  variables?: TVariables;
  fetchPolicy?: FetchPolicy;
}

export function TypedMutation<TData, TVariables>(
  mutation: DocumentNode,
  update?: MutationUpdaterFn<TData>
) {
  class StrictTypedMutation extends Mutation<TData, TVariables> {}
  return ({
    children,
    fetchPolicy,
    onCompleted,
    onError,
    variables
  }: TypedMutationInnerProps<TData, TVariables>) => (
    <StrictTypedMutation
      fetchPolicy={fetchPolicy}
      mutation={mutation}
      onCompleted={onCompleted}
      onError={onError}
      update={update}
      variables={variables}
    >
      {children}
    </StrictTypedMutation>
  );
}
