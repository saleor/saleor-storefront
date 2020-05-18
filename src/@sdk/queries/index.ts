import {
  ApolloClient,
  ObservableQuery,
  QueryOptions as ApolloQueryOptions,
} from "apollo-client";

import { RequireOnlyOne } from "../tsHelpers";
import * as AttributesList from "./attributes";
import * as Category from "./category";
import * as Orders from "./orders";
import * as Product from "./products";
import * as Shop from "./shop";

import { OrderByToken, OrderByTokenVariables } from "./gqlTypes/OrderByToken";

import { Attributes, AttributesVariables } from "./gqlTypes/Attributes";
import {
  ProductDetails,
  ProductDetailsVariables,
} from "./gqlTypes/ProductDetails";

import { ProductList, ProductListVariables } from "./gqlTypes/ProductList";

import {
  CategoryDetails,
  CategoryDetailsVariables,
} from "./gqlTypes/CategoryDetails";

import { GetShop } from "./gqlTypes/GetShop";

import { OrdersByUser, OrdersByUserVariables } from "./gqlTypes/OrdersByUser";
import { UserDetails } from "./gqlTypes/UserDetails";
import {
  VariantsProducts,
  VariantsProductsVariables,
} from "./gqlTypes/VariantsProducts";

import * as User from "./user";

type QueryOptions<T = {}> = T extends { [n: string]: never }
  ? Omit<ApolloQueryOptions<{}>, "query">
  : RequireOnlyOne<Omit<ApolloQueryOptions<T>, "query">, "variables">;

// TODO: Add ability to pass custom fragments to queries
export const QUERIES = {
  Attributes: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<AttributesVariables>
  ): ObservableQuery<Attributes, any> =>
    client.watchQuery({
      query: AttributesList.attributes,
      ...options,
    }),
  CategoryDetails: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<CategoryDetailsVariables>
  ): ObservableQuery<CategoryDetails, any> =>
    client.watchQuery({
      query: Category.categoryQuery,
      ...options,
    }),
  GetShopDetails: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<null>
  ): ObservableQuery<GetShop, any> =>
    client.watchQuery({
      query: Shop.getShop,
      ...options,
    }),
  OrderDetails: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<OrderByTokenVariables>
  ): ObservableQuery<OrderByToken, any> =>
    client.watchQuery({
      query: User.orderDetailsByTokenQuery,
      ...options,
    }),
  OrdersByUser: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<OrdersByUserVariables>
  ): ObservableQuery<OrdersByUser, any> =>
    client.watchQuery({
      query: Orders.ordersByUser,
      ...options,
    }),
  ProductDetails: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<ProductDetailsVariables>
  ): ObservableQuery<ProductDetails, any> =>
    client.watchQuery({
      query: Product.productDetails,
      ...options,
    }),
  ProductList: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<ProductListVariables>
  ): ObservableQuery<ProductList, any> =>
    client.watchQuery({
      query: Product.productListDetails,
      ...options,
    }),
  UserDetails: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<null>
  ): ObservableQuery<UserDetails, any> =>
    client.watchQuery({
      query: User.getUserDetailsQuery,
      ...options,
    }),
  VariantsProducts: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<VariantsProductsVariables>
  ): ObservableQuery<VariantsProducts, any> =>
    client.watchQuery({
      query: Product.variantsProducts,
      ...options,
    }),
};

export type QUERIES = typeof QUERIES;
