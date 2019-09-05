import {
  ApolloClient,
  ObservableQuery,
  QueryOptions as ApolloQueryOptions
} from "apollo-client";
import gql from "graphql-tag";

import { RequireOnlyOne } from "../tsHelpers";
import * as Checkout from "./checkout";
import * as Orders from "./orders";
import * as Product from "./products";

import {
  CheckoutDetails,
  CheckoutDetailsVariables
} from "./types/CheckoutDetails";
import { OrderByToken, OrderByTokenVariables } from "./types/OrderByToken";
import {
  ProductDetails,
  ProductDetailsVariables
} from "./types/ProductDetails";

import { OrdersByUser, OrdersByUserVariables } from "./types/OrdersByUser";
import { UserCheckoutDetails } from "./types/UserCheckoutDetails";
import { UserDetails } from "./types/UserDetails";
import * as User from "./user";

type QueryOptions<T = {}> = T extends { [n: string]: never }
  ? Omit<ApolloQueryOptions<{}>, "query">
  : RequireOnlyOne<Omit<ApolloQueryOptions<T>, "query">, "variables">;

// TODO: Add ability to pass custom fragments to queries
export const QUERIES = {
  CheckoutDetails: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<CheckoutDetailsVariables>
  ): ObservableQuery<CheckoutDetails, any> =>
    client.watchQuery({
      query: gql`
        ${Checkout.checkoutDetails}
      `,
      ...options,
    }),
  OrderDetails: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<OrderByTokenVariables>
  ): ObservableQuery<OrderByToken, any> =>
    client.watchQuery({
      query: gql`
        ${User.orderDetailsByTokenQuery}
      `,
      ...options,
    }),
  OrdersByUser: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<OrdersByUserVariables>
  ): ObservableQuery<OrdersByUser, any> =>
    client.watchQuery({
      query: gql`
        ${Orders.ordersByUser}
      `,
      ...options,
    }),
  ProductDetails: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<ProductDetailsVariables>
  ): ObservableQuery<ProductDetails, any> =>
    client.watchQuery({
      query: gql`
        ${Product.productDetails}
      `,
      ...options,
    }),
  UserCheckoutDetails: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<null>
  ): ObservableQuery<UserCheckoutDetails, any> =>
    client.watchQuery({
      query: gql`
        ${Checkout.userCheckoutDetails}
      `,
      ...options,
    }),
  UserDetails: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<null>
  ): ObservableQuery<UserDetails, any> =>
    client.watchQuery({
      query: gql`
        ${User.getUserDetailsQuery}
      `,
      ...options,
    }),
};

export type QUERIES = typeof QUERIES;
