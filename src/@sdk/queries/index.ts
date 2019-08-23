import {
  ApolloClient,
  ObservableQuery,
  QueryOptions as ApolloQueryOptions
} from "apollo-client";
import gql from "graphql-tag";

import { RequireOnlyOne } from "../tsHelpers";
import * as Checkout from "./checkout";
import * as Product from "./products";
import { getCheckout, getCheckoutVariables } from "./types/getCheckout";
import { getUserCheckout } from "./types/getUserCheckout";
import { OrderById, OrderByIdVariables } from "./types/OrderById";
import { OrderByToken, OrderByTokenVariables } from "./types/OrderByToken";
import {
  ProductDetails,
  ProductDetailsVariables
} from "./types/ProductDetails";
import { UserDetails } from "./types/UserDetails";
import * as User from "./user";

type QueryOptions<T = {}> = T extends { [n: string]: never }
  ? Omit<ApolloQueryOptions<{}>, "query">
  : RequireOnlyOne<Omit<ApolloQueryOptions<T>, "query">, "variables">;

// TODO: Add ability to pass custom fragments to queries
export const QUERIES = {
  CheckoutDetails: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<getCheckoutVariables>
  ): ObservableQuery<getCheckout, any> =>
    client.watchQuery({
      query: gql`
        ${Checkout.getCheckoutQuery}
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
  UserCheckout: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<null>
  ): ObservableQuery<getUserCheckout, any> =>
    client.watchQuery({
      query: gql`
        ${Checkout.getUserCheckoutQuery}
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
