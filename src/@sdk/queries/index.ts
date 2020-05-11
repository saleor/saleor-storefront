import {
  ApolloClient,
  ObservableQuery,
  QueryOptions as ApolloQueryOptions,
} from "apollo-client";

import { RequireOnlyOne } from "../tsHelpers";
import * as AttributesList from "./attributes";
import * as Category from "./category";
import * as Checkout from "./checkout";
import * as Orders from "./orders";
import * as Product from "./products";
import * as Shop from "./shop";

import {
  CheckoutDetails,
  CheckoutDetailsVariables,
} from "./types/CheckoutDetails";
import { OrderByToken, OrderByTokenVariables } from "./types/OrderByToken";

import { Attributes, AttributesVariables } from "./types/Attributes";
import {
  ProductDetails,
  ProductDetailsVariables,
} from "./types/ProductDetails";

import { ProductList, ProductListVariables } from "./types/ProductList";

import {
  CategoryDetails,
  CategoryDetailsVariables,
} from "./types/CategoryDetails";

import { GetShop } from "./types/GetShop";
import { GetShopPaymentGateways } from "./types/GetShopPaymentGateways";

import {
  CheckoutProductVariants,
  CheckoutProductVariantsVariables,
} from "./types/CheckoutProductVariants";
import { OrdersByUser, OrdersByUserVariables } from "./types/OrdersByUser";
import { UserCheckoutDetails } from "./types/UserCheckoutDetails";
import { UserDetails } from "./types/UserDetails";
import {
  VariantsProducts,
  VariantsProductsVariables,
} from "./types/VariantsProducts";

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
  CheckoutDetails: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<CheckoutDetailsVariables>
  ): ObservableQuery<CheckoutDetails, any> =>
    client.watchQuery({
      query: Checkout.checkoutDetails,
      ...options,
    }),
  CheckoutProductVariants: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<CheckoutProductVariantsVariables>
  ): ObservableQuery<CheckoutProductVariants, any> =>
    client.watchQuery({
      query: Checkout.checkoutProductVariants,
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
  GetShopPaymentGateways: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<null>
  ): ObservableQuery<GetShopPaymentGateways, any> =>
    client.watchQuery({
      query: Shop.getShopPaymentGateways,
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
  UserCheckoutDetails: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<null>
  ): ObservableQuery<UserCheckoutDetails, any> =>
    client.watchQuery({
      query: Checkout.userCheckoutDetails,
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
