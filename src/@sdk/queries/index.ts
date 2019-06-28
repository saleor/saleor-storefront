import { ApolloClient, ApolloQueryResult, QueryOptions } from "apollo-client";
import gql from "graphql-tag";

import { Omit, RequireOnlyOne } from "../tsHelpers";
import * as Product from "./products";

// TEST TYPES
import { ProductDetails } from "../../views/Product/types/ProductDetails";

export type SQueryOptions<T = {}> = T extends { [n: string]: never }
  ? Omit<QueryOptions<{}>, "query">
  : RequireOnlyOne<Omit<QueryOptions<T>, "query">, "variables">;

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
    options: SQueryOptions<{ id: string }>
  ): Promise<ApolloQueryResult<ProductDetails>> =>
    client.query({
      query: gql`
        ${Product.productDetails}
      `,
      ...options,
    }),
};

export type QUERIES = typeof QUERIES;
