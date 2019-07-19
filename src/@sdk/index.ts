import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient, ApolloError } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { BatchHttpLink } from "apollo-link-batch-http";
import { RetryLink } from "apollo-link-retry";
import urljoin from "url-join";

import { TokenAuth } from "../components/User/types/TokenAuth";
import { authLink, getAuthToken, invalidTokenLink, setAuthToken } from "./auth";
import { MUTATIONS } from "./mutations";
import { QUERIES } from "./queries";
import { InferOptions, MapFn, QueryShape } from "./types";
import { flatten, getErrorsFromData } from "./utils";

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
  getProductDetails = this.fireQuery(QUERIES.ProductDetails, flatten);

  getUserDetails = this.fireQuery(QUERIES.UserDetails, flatten);

  getUserOrderDetails = this.fireQuery(QUERIES.UserOrders, flatten);

  private client: ApolloClient<any>;

  constructor(client: ApolloClient<any>) {
    this.client = client;
  }

  signIn = (
    variables: InferOptions<MUTATIONS["TokenAuth"]>["variables"],
    options?: Omit<InferOptions<MUTATIONS["TokenAuth"]>, "variables">
  ) =>
    new Promise<TokenAuth["tokenCreate"]>(async (resolve, reject) => {
      try {
        const data = await this.fireQuery(
          MUTATIONS.TokenAuth,
          data => data.tokenCreate
        )(variables, {
          ...options,
          update: (proxy, data) => {
            if (data.data.tokenCreate.token) {
              setAuthToken(data.data.tokenCreate.token);
              if (window.PasswordCredential && variables) {
                navigator.credentials.store(
                  new window.PasswordCredential({
                    id: variables.email,
                    password: variables.password,
                  })
                );
              }
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
  private fireQuery<T extends QueryShape, TResult>(
    query: T,
    mapFn: MapFn<T, TResult>
  ) {
    return (
      variables: InferOptions<T>["variables"],
      options?: Omit<InferOptions<T>, "variables">
    ) =>
      new Promise<ReturnType<typeof mapFn>>(async (resolve, reject) => {
        try {
          const { data, errors: apolloErrors } = await query(this.client, {
            ...options,
            variables,
          });

          // INFO: user input errors will be moved to graphql errors
          const userInputErrors = getErrorsFromData(data);
          const errors =
            apolloErrors ||
            (userInputErrors
              ? new ApolloError({ extraInfo: userInputErrors })
              : null);

          if (errors) {
            reject(errors);
          }

          const mappedData = mapFn(data);
          const result = !!Object.keys(mappedData).length ? mappedData : null;

          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
  }
}
