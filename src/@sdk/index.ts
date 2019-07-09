import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient, ApolloError } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { BatchHttpLink } from "apollo-link-batch-http";
import { RetryLink } from "apollo-link-retry";
import urljoin from "url-join";

import { authLink, getAuthToken, invalidTokenLink, setAuthToken } from "./auth";
import { MUTATIONS } from "./mutations";
import { QUERIES } from "./queries";
import { InferOptions, ReturnData } from "./tsHelpers";
import { getErrorsFromData } from "./utils";

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

  getProductDetails = this.fireQuery<QUERIES, "ProductDetails">(
    QUERIES.ProductDetails
  );

  getUserOrderDetails = this.fireQuery<QUERIES, "UserOrders">(
    QUERIES.UserOrders
  );

  constructor(client: ApolloClient<any>) {
    this.client = client;
  }

  signIn = (
    variables: InferOptions<MUTATIONS["TokenAuth"]>["variables"],
    options?: Omit<InferOptions<MUTATIONS["TokenAuth"]>, "variables">
  ): Promise<ReturnData<MUTATIONS, "TokenAuth">> =>
    new Promise(async (resolve, reject) => {
      try {
        const data = await this.fireQuery<MUTATIONS, "TokenAuth">(
          MUTATIONS.TokenAuth
        )(variables, {
          ...options,
          update: (proxy, data) => {
            if (data.data.tokenCreate.token) {
              setAuthToken(data.data.tokenCreate.token);
            }
            if (options && options.update) {
              options.update(proxy, data);
            }
          },
        });

        resolve(data);
      } catch (e) {
        reject(e);
      }
    });

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

  // Query and mutation wrapper to catch errors
  private fireQuery<
    T extends { [key: string]: (...args: any) => any },
    N extends keyof T
  >(query: T[N]) {
    return (
      variables: InferOptions<T[N]>["variables"],
      options?: Omit<InferOptions<T[N]>, "variables">
    ): Promise<ReturnData<T, N>> =>
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
}
