import {
  ApolloClient,
  ApolloQueryResult,
  QueryOptions as ApolloQueryOptions
} from "apollo-client";
import gql from "graphql-tag";

import { Omit, RequireOnlyOne } from "../tsHelpers";
import * as Product from "./products";

// TEST TYPES
import { ProductDetails } from "../../views/Product/types/ProductDetails";

export type QueryOptions<T = {}> = T extends { [n: string]: never }
  ? Omit<ApolloQueryOptions<{}>, "query">
  : RequireOnlyOne<Omit<ApolloQueryOptions<T>, "query">, "variables">;

export type InferVariables<
  N extends keyof QUERIES,
  T extends QUERIES[N]
> = T extends (c, o: infer O) => any
  ? O extends { variables }
    ? O
    : never
  : {};

// TODO: Add ability to pass custom fragments to queries
export const QUERIES = {
  ProductDetails: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<{ id: string }>
  ): Promise<ApolloQueryResult<ProductDetails>> =>
    client.query({
      query: gql`
        ${Product.productDetails}
      `,
      ...options,
    }),
};

export type QUERIES = typeof QUERIES;
