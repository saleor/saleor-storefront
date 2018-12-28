import { ApolloQueryResult, ErrorPolicy, FetchPolicy } from "apollo-client";
import { DocumentNode } from "graphql";
import * as React from "react";
import { Query, QueryResult } from "react-apollo";

import { Error } from "../components/Error";
import Loader from "../components/Loader";
import { maybe } from "./utils";

interface LoadMore<TData> {
  loadMore: (
    mergeFunc: (prev: TData, next: TData) => TData,
    cursor: string,
    cursorKey?: string
  ) => Promise<ApolloQueryResult<TData>>;
}

interface TypedQueryInnerProps<TData, TVariables> {
  children: (
    result: QueryResult<TData, TVariables> & LoadMore<TData>
  ) => React.ReactNode;
  displayError?: boolean;
  displayLoader?: boolean;
  fetchPolicy?: FetchPolicy;
  loaderFull?: boolean;
  renderOnError?: boolean;
  skip?: boolean;
  variables?: TVariables;
  errorPolicy?: ErrorPolicy;
}

export function TypedQuery<TData, TVariables>(query: DocumentNode) {
  class StrictTypedQuery extends Query<TData, TVariables> {}

  return ({
    children,
    displayError = true,
    displayLoader = true,
    renderOnError = false,
    fetchPolicy = "cache-and-network",
    errorPolicy,
    loaderFull,
    skip,
    variables
  }: TypedQueryInnerProps<TData, TVariables>) => (
    <StrictTypedQuery
      query={query}
      variables={variables}
      skip={skip}
      fetchPolicy={fetchPolicy}
      errorPolicy={errorPolicy}
    >
      {queryData => {
        const { error, loading, data, fetchMore } = queryData;
        const hasData = maybe(() => !!Object.keys(data).length, false);
        const loadMore = (
          mergeFunc: (previousResults: TData, fetchMoreResult: TData) => TData,
          cursor: string,
          cursorKey: string = "after"
        ) =>
          fetchMore({
            query,
            updateQuery: (previousResults, { fetchMoreResult }) => {
              if (!fetchMoreResult) {
                return previousResults;
              }
              return mergeFunc(previousResults, fetchMoreResult);
            },
            variables: { ...variables, [cursorKey]: cursor }
          });

        if (displayError && error && !hasData) {
          return <Error error={error.message} />;
        }

        if (displayLoader && loading && !hasData) {
          return <Loader full={loaderFull} />;
        }

        if (hasData || (renderOnError && error)) {
          return children({ ...queryData, loadMore });
        }

        return null;
      }}
    </StrictTypedQuery>
  );
}
