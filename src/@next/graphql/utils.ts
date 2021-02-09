import { DocumentNode } from "graphql";
import { ObservableQueryFields } from "react-apollo";

import { RequireAtLeastOne } from "@utils/tsUtils";

export const handleQueryLoadMore = <TData, TVariables>(query: DocumentNode) => (
  fetchMore: ObservableQueryFields<TData, TVariables>["fetchMore"],
  variables: RequireAtLeastOne<TVariables>
) => (
  mergeFunc: (previousResults: TData, fetchMoreResult: TData) => TData,
  endCursor: string
) =>
  fetchMore({
    query,
    updateQuery: (previousResults, { fetchMoreResult }) => {
      if (!fetchMoreResult) {
        return previousResults;
      }
      return mergeFunc(previousResults, fetchMoreResult);
    },
    variables: { ...variables, endCursor },
  });
