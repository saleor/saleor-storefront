import { FetchPolicy } from "apollo-client";
import { DocumentNode } from "graphql";
import * as React from "react";
import { Query, QueryResult } from "react-apollo";

import { Error } from "../components/Error";
import Loader from "../components/Loader";

interface TypedQueryInnerProps<TData, TVariables> {
  children: (result: QueryResult<TData, TVariables>) => React.ReactNode;
  displayError?: boolean;
  displayLoader?: boolean;
  fetchPolicy?: FetchPolicy;
  loaderFull?: boolean;
  skip?: boolean;
  variables?: TVariables;
}

export function TypedQuery<TData, TVariables>(query: DocumentNode) {
  class StrictTypedQuery extends Query<TData, TVariables> {}

  return ({
    children,
    displayError = true,
    displayLoader = true,
    fetchPolicy = "cache-and-network",
    loaderFull,
    skip,
    variables
  }: TypedQueryInnerProps<TData, TVariables>) => (
    <StrictTypedQuery
      query={query}
      variables={variables}
      skip={skip}
      fetchPolicy={fetchPolicy}
    >
      {queryData => {
        const { error, loading, data } = queryData;
        const hasData = Object.keys(data).length;

        if (displayError && error) {
          return <Error error={error.message} />;
        }

        if (displayLoader && !hasData) {
          return <Loader full={loaderFull} />;
        }

        if (hasData) {
          return children(queryData);
        }

        return null;
      }}
    </StrictTypedQuery>
  );
}
