import {
  ApolloClient,
  ApolloQueryResult,
  QueryOptions as ApolloQueryOptions
} from "apollo-client";
import gql from "graphql-tag";

import { Omit, RequireOnlyOne } from "../tsHelpers";
import * as Product from "./products";
import { OrderByToken, OrderByTokenVariables } from "./types/OrderByToken";
import {
  ProductDetails,
  ProductDetailsVariables
} from "./types/ProductDetails";
import { UserDetails } from "./types/UserDetails";
import * as User from "./user";

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
    options: QueryOptions<ProductDetailsVariables>
  ): Promise<ApolloQueryResult<ProductDetails>> =>
    client.query({
      query: gql`
        ${Product.productDetails}
      `,
      ...options,
    }),
  UserDetails: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<null>
  ): Promise<ApolloQueryResult<UserDetails>> =>
    client.query({
      query: gql`
        ${User.getUserDetailsQuery}
      `,
      ...options,
    }),
  UserOrders: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<OrderByTokenVariables>
  ): Promise<ApolloQueryResult<OrderByToken>> =>
    client.query({
      query: gql`
        ${User.orderDetailsByTokenQuery}
      `,
      ...options,
    }),
};

export type QUERIES = typeof QUERIES;
