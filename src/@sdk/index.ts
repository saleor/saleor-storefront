import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient, ApolloError, ApolloQueryResult } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { BatchHttpLink } from "apollo-link-batch-http";
import { RetryLink } from "apollo-link-retry";
import urljoin from "url-join";

import { authLink, getAuthToken, invalidTokenLink, setAuthToken } from "./auth";
import { MUTATIONS } from "./mutations";
import { QUERIES } from "./queries";
import { KeysMatching } from "./tsHelpers";
import { getErrorsFromData } from "./utils";

type InferOptions<T> = T extends (c, o: infer O) => any ? O : never;
type NestedData<T> = KeysMatching<T, { [key: string]: any }>;
type ReturnData<
  T extends { [key: string]: (...args: any) => any },
  N extends keyof T
> = ReturnType<T[N]> extends Promise<infer R> ? NestedData<R["data"]> : never;

type MutationData<T extends keyof MUTATIONS> = ReturnData<MUTATIONS, T>;
type QueryData<T extends keyof QUERIES> = ReturnData<QUERIES, T>;

const { invalidLink } = invalidTokenLink();
const getLink = url =>
  ApolloLink.from([
    invalidLink,
    authLink,
    new RetryLink(),
    new BatchHttpLink({ uri: urljoin(url || "/", "/graphql/") }),
  ]);

export const createSaleorClient = (url?: string, cache = new InMemoryCache()) =>
  new ApolloClient({
    cache,
    link: getLink(url),
  });

export class SaleorAPI {
  client: ApolloClient<any>;
  userId: string | null;

  constructor(client: ApolloClient<any>) {
    this.client = client;
  }

  attachAuthListener = (callback: (authenticated: boolean) => void) => {
    const eventHandler = () => {
      callback(this.isLoggedIn());
    };

    addEventListener("auth", eventHandler);

    return () => {
      removeEventListener("auth", eventHandler);
    };
  };

  isLoggedIn = () => {
    return !!getAuthToken();
  };

  // AUTH QUERY
  setAuthToken = (
    variables,
    options: InferOptions<MUTATIONS["TokenAuth"]>
  ): Promise<MutationData<"TokenAuth">> =>
    new Promise(async (resolve, reject) => {
      try {
        const { data } = await MUTATIONS.TokenAuth(this.client, {
          ...options,
          variables,
        });
        const errors = getErrorsFromData(data);

        // throw user input errors
        if (errors) {
          reject(new ApolloError({ extraInfo: errors }));
        }

        setAuthToken(data.tokenCreate.token);
        this.userId = data.tokenCreate.user.id;

        resolve(data.tokenCreate);
      } catch (err) {
        reject(err);
      }
    });

  // TODO: Use query/mutation key once, infer throughout
  getUserOrderDetails = (
    variables,
    options: InferOptions<QUERIES["UserOrders"]>
  ) =>
    this.fireQuery<QueryData<"UserOrders">>(
      QUERIES.UserOrders,
      variables,
      options
    );

  getProductDetails = (variables, options = {}) =>
    this.fireQuery<QueryData<"ProductDetails">>(
      QUERIES.ProductDetails,
      variables,
      options
    );

  // Query and mutation wrapper to catch errors
  private fireQuery = <T>(query: any, variables, options): Promise<T> =>
    new Promise(async (resolve, reject) => {
      try {
        const { data, errors: apolloErrors } = await query(this.client, {
          ...options,
          variables,
        });

        const userInputErrors = getErrorsFromData(data);
        const errors =
          apolloErrors ||
          (userInputErrors
            ? new ApolloError({ extraInfo: userInputErrors })
            : null);

        if (errors) {
          reject(errors);
        }

        // IMPORTANT: this function relies on unique nested key names
        const nestedData = Object.keys(data).reduce(
          (acc, key) => ({
            ...acc,
            ...data[key],
          }),
          {}
        );
        const result = !!Object.keys(nestedData).length ? nestedData : null;

        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
}
