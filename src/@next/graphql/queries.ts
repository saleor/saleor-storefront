import { ApolloQueryResult, OperationVariables } from "apollo-client";
import { DocumentNode } from "graphql";
import gql from "graphql-tag";
import { QueryHookOptions, QueryResult, useQuery } from "react-apollo";

import {
  attributeFragment,
  featuredProductsFragment,
  menuItemFragment,
} from "./fragments";

type LoadMore<TData> = (
  mergeFn: (prev: TData, next: TData) => TData,
  endCursor: string
) => Promise<ApolloQueryResult<TData>>;

export const useTypedQuery = <TData = any, TVariables = OperationVariables>(
  query: DocumentNode,
  options?: QueryHookOptions<TData, TVariables>
): QueryResult<TData, TVariables> & {
  loadMore: LoadMore<TData>;
} => {
  const queryResult = useQuery<TData, TVariables>(query, options);

  const loadMore: LoadMore<TData> = (mergeFn, endCursor) =>
    queryResult.fetchMore({
      query,
      updateQuery: (previousResults, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResults;
        }
        return mergeFn(previousResults, fetchMoreResult);
      },
      variables: { ...options?.variables, after: endCursor },
    });

  return { loadMore, ...queryResult };
};

export const featuredProductsQuery = gql`
  ${featuredProductsFragment}
  query FeaturedProductsQuery($channel: String!) {
    ...FeaturedProducts
  }
`;

export const shopAttributesQuery = gql`
  ${attributeFragment}
  query ShopAttributesQuery(
    $channel: String!
    $collectionId: ID
    $categoryId: ID
  ) {
    attributes(
      channel: $channel
      filter: {
        inCollection: $collectionId
        inCategory: $categoryId
        filterableInStorefront: true
      }
      first: 100
    ) {
      edges {
        node {
          ...Attribute
        }
      }
    }
  }
`;

export const shopMenusQuery = gql`
  ${menuItemFragment}
  query ShopMenusQuery(
    $channel: String!
    $footerSlug: String!
    $mainMenuSlug: String!
  ) {
    footer: menu(channel: $channel, slug: $footerSlug) {
      id
      items {
        ...MenuItem
        children {
          ...MenuItem
        }
      }
    }
    mainMenu: menu(channel: $channel, slug: $mainMenuSlug) {
      items {
        ...MenuItem
        children {
          ...MenuItem
          children {
            ...MenuItem
          }
        }
      }
    }
  }
`;
