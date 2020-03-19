import { InMemoryCache } from "apollo-cache-inmemory";
import {
  ApolloClient,
  ApolloError,
  ObservableQuery,
  WatchQueryOptions,
} from "apollo-client";
import { ApolloLink } from "apollo-link";
import { BatchHttpLink } from "apollo-link-batch-http";
import { RetryLink } from "apollo-link-retry";
import { GraphQLError } from "graphql";
import urljoin from "url-join";

import { TokenAuth } from "../components/User/types/TokenAuth";
import { SaleorCheckoutAPI, SaleorCheckoutAPIState } from "./api/Checkout";
import {
  authLink,
  clearStorage,
  getAuthToken,
  invalidTokenLink,
  setAuthToken,
} from "./auth";
import { defaultConfig } from "./config";
import { MUTATIONS } from "./mutations";
import { QUERIES } from "./queries";
import { UserDetails } from "./queries/types/UserDetails";
import { LocalRepository, ICheckoutModel } from "./repository";
import { RequireAtLeastOne } from "./tsHelpers";
import {
  Config,
  InferOptions,
  MapFn,
  QueryShape,
  WatchMapFn,
  WatchQueryData,
} from "./types";
import {
  getErrorsFromData,
  getMappedData,
  isDataEmpty,
  mergeEdges,
} from "./utils";
import { ApolloErrorWithUserInput } from "./react/types";

const { invalidLink } = invalidTokenLink();
const getLink = (url?: string) =>
  ApolloLink.from([
    invalidLink,
    authLink,
    new RetryLink(),
    new BatchHttpLink({ uri: urljoin(url || "/", "/graphql/") }),
  ]);

export const createSaleorClient = (url?: string, cache = new InMemoryCache()) =>
  new ApolloClient({
    cache,
    defaultOptions: {
      mutate: {
        errorPolicy: "all",
      },
      query: {
        errorPolicy: "all",
        fetchPolicy: "network-only",
      },
      watchQuery: {
        errorPolicy: "all",
        fetchPolicy: "cache-and-network",
      },
    },
    link: getLink(url),
  });

export interface SaleorCheckoutSDK {
  errors: Array<ApolloErrorWithUserInput | any>;
  checkout: ICheckoutModel | null;
  loading: {
    addItemToCart: boolean;
    load: boolean;
    removeItemFromCart: boolean;
    setBillingAddress: boolean;
    setShippingAddress: boolean;
    setShippingAsBillingAddress: boolean;
    subtractItemFromCart: boolean;
    updateItemInCart: boolean;
  };
  promoCode: string | null;
  shippingAsBilling: boolean;
  addItemToCart: (variantId: string, quantity: number) => void;
  load: () => void;
  removeItemFromCart: (variantId: string) => void;
  subtractItemFromCart: (variantId: string) => void;
  setBillingAddress: () => void;
  setShippingAddress: () => void;
  setShippingAsBillingAddress: () => void;
  updateItemInCart: (variantId: string, quantity: number) => void;
  makeOrder: () => void;
}

export interface SaleorSDK {
  checkout: SaleorCheckoutSDK;
}

export class API {
  client: ApolloClient<any>;

  constructor(client: ApolloClient<any>) {
    this.client = client;
  }

  _watchQuery = <T extends QueryShape, TResult>(
    query: T,
    mapFn: WatchMapFn<T, TResult>
  ) => {
    return <
      TVariables extends InferOptions<T>["variables"],
      TOptions extends Omit<
        InferOptions<T> | WatchQueryOptions<InferOptions<T>>,
        "variables"
      >
    >(
      variables: TVariables,
      options: TOptions & {
        skip?: boolean;
        onComplete?: () => void;
        onError?: (error: ApolloError) => void;
        onUpdate: (data: ReturnType<typeof mapFn> | null) => void;
      }
    ) => {
      const { onComplete, onError, onUpdate, ...apolloClientOptions } = options;

      const observable: ObservableQuery<WatchQueryData<T>, TVariables> = query(
        this.client,
        {
          ...apolloClientOptions,
          variables,
        }
      );

      if (options.skip) {
        return {
          refetch: (_variables?: TVariables) => {
            return new Promise((resolve, _reject) => {
              resolve({ data: null });
            });
          },
          unsubscribe: null,
        };
      }

      const subscription = observable.subscribe(
        result => {
          const { data, errors: apolloErrors } = result;
          const errorHandledData = handleDataErrors(
            mapFn,
            data as any,
            apolloErrors
          );
          if (onUpdate) {
            if (errorHandledData.errors) {
              if (onError) {
                onError(errorHandledData.errors);
              }
            } else {
              onUpdate(errorHandledData.data as TResult);
              if (onComplete) {
                onComplete();
              }
            }
          }
        },
        error => {
          if (onError) {
            onError(error);
          }
        }
      );

      return {
        loadMore: (
          extraVariables: RequireAtLeastOne<TVariables>,
          mergeResults: boolean = true
        ) => {
          observable.fetchMore({
            updateQuery: (previousResult, { fetchMoreResult }) => {
              if (!fetchMoreResult) {
                // returning previousResult doesn't trigger observable `next`
                onUpdate(mapFn(previousResult));
                return previousResult;
              }

              if (mergeResults) {
                const prevResultRef = mapFn(previousResult) as any;
                const newResultRef = mapFn(fetchMoreResult) as any;

                if (!prevResultRef || !newResultRef) {
                  onUpdate(prevResultRef);
                  return previousResult;
                }

                const mergedEdges = mergeEdges(
                  prevResultRef.edges,
                  newResultRef.edges
                );

                // use new result for metadata and mutate existing data
                Object.keys(prevResultRef).forEach(key => {
                  prevResultRef[key] = newResultRef[key];
                });
                prevResultRef.edges = mergedEdges;

                return previousResult;
              }

              return fetchMoreResult;
            },
            variables: { ...variables, ...extraVariables },
          });
        },
        refetch: (variables?: TVariables) => {
          if (variables) {
            observable.setVariables(variables);
            const cachedResult = observable.currentResult();
            const errorHandledData = handleDataErrors(mapFn, cachedResult.data);
            if (errorHandledData.data) {
              onUpdate(errorHandledData.data as TResult);
            }
          }

          return this._firePromise(() => observable.refetch(variables), mapFn);
        },
        setOptions: (options: TOptions) =>
          this._firePromise(() => observable.setOptions(options), mapFn),
        unsubscribe: subscription.unsubscribe.bind(subscription),
      };
    };
  };

  _fireQuery = <T extends QueryShape, TResult>(
    query: T,
    mapFn: MapFn<T, TResult>
  ) => {
    return (
      variables: InferOptions<T>["variables"],
      options?: Omit<InferOptions<T>, "variables">
    ) =>
      this._firePromise(
        () =>
          query(this.client, {
            ...options,
            variables,
          }),
        mapFn
      );
  };

  // Promise wrapper to catch errors
  _firePromise = <T extends QueryShape, TResult>(
    promise: () => Promise<any>,
    mapFn: MapFn<T, TResult> | WatchMapFn<T, TResult>
  ) => {
    return new Promise<{ data: ReturnType<typeof mapFn> | null }>(
      async (resolve, reject) => {
        try {
          const { data, errors: apolloErrors } = await promise();
          const errorHandledData = handleDataErrors(mapFn, data, apolloErrors);

          if (errorHandledData.errors) {
            reject(errorHandledData.errors);
          }

          resolve({ data: errorHandledData.data });
        } catch (error) {
          reject(error);
        }
      }
    );
  };
}

export class SaleorAPI extends API {
  checkout: SaleorCheckoutAPI;

  getAttributes = this._watchQuery(QUERIES.Attributes, data => data.attributes);

  getCheckoutDetails = this._watchQuery(
    QUERIES.CheckoutDetails,
    data => data.checkout
  );

  getProductDetails = this._watchQuery(
    QUERIES.ProductDetails,
    data => data.product
  );

  getProductList = this._watchQuery(QUERIES.ProductList, data => data.products);

  getCategoryDetails = this._watchQuery(
    QUERIES.CategoryDetails,
    data => data.category
  );

  getOrdersByUser = this._watchQuery(QUERIES.OrdersByUser, data =>
    data.me ? data.me.orders : null
  );

  getOrderDetails = this._watchQuery(
    QUERIES.OrderDetails,
    data => data.orderByToken
  );

  getUserCheckout = this._watchQuery(QUERIES.UserCheckoutDetails, data =>
    data.me ? data.me.checkout : null
  );

  getUserWishlist = this._watchQuery(QUERIES.Wishlist, data =>
    data.me ? data.me.wishlist : null
  );

  getVariantsProducts = this._watchQuery(
    QUERIES.VariantsProducts,
    data => data.productVariants
  );

  getCheckoutProductVariants = this._watchQuery(
    QUERIES.CheckoutProductVariants,
    data => data.productVariants
  );

  getShopDetails = this._watchQuery(QUERIES.GetShopDetails, data => data);

  setUserDefaultAddress = this._fireQuery(
    MUTATIONS.AddressTypeUpdate,
    data => data!.accountSetDefaultAddress
  );

  setCreateCheckout = this._fireQuery(
    MUTATIONS.CreateCheckout,
    data => data!.checkoutCreate
  );

  setCheckoutLine = this._fireQuery(
    MUTATIONS.UpdateCheckoutLine,
    data => data!.checkoutLinesUpdate
  );

  setCheckoutShippingAddress = this._fireQuery(
    MUTATIONS.UpdateCheckoutShippingAddress,
    data => data!.checkoutShippingAddressUpdate
  );

  setAddCheckoutPromoCode = this._fireQuery(
    MUTATIONS.AddCheckoutPromoCode,
    data => data!.checkoutAddPromoCode
  );

  setRemoveCheckoutPromoCode = this._fireQuery(
    MUTATIONS.RemoveCheckoutPromoCode,
    data => data!.checkoutRemovePromoCode
  );

  setDeleteUserAddress = this._fireQuery(
    MUTATIONS.DeleteUserAddress,
    data => data!.accountAddressDelete
  );

  setCreateUserAddress = this._fireQuery(
    MUTATIONS.CreateUserAddress,
    data => data!.accountAddressCreate
  );

  setUpdateuserAddress = this._fireQuery(
    MUTATIONS.UpdateUserAddress,
    data => data!.accountAddressUpdate
  );

  setAddWishlistProduct = this._fireQuery(
    MUTATIONS.AddWishlistProduct,
    data => data!.wishlistAddProduct
  );

  setRemoveWishlistProduct = this._fireQuery(
    MUTATIONS.RemoveWishlistProduct,
    data => data!.wishlistRemoveProduct
  );

  setAddWishlistProductVariant = this._fireQuery(
    MUTATIONS.AddWishlistProductVariant,
    data => data!.wishlistAddVariant
  );

  setRemoveWishlistProductVariant = this._fireQuery(
    MUTATIONS.RemoveWishlistProductVariant,
    data => data!.wishlistRemoveVariant
  );

  setCheckoutBillingAddress = this._fireQuery(
    MUTATIONS.UpdateCheckoutBillingAddress,
    data => data!.checkoutBillingAddressUpdate
  );

  setAccountUpdate = this._fireQuery(
    MUTATIONS.AccountUpdate,
    data => data!.accountUpdate
  );

  setPasswordChange = this._fireQuery(MUTATIONS.PasswordChange, data => data);

  setPassword = this._fireQuery(MUTATIONS.SetPassword, data => data);

  client: ApolloClient<any>;

  repository: LocalRepository;

  constructor(
    client: ApolloClient<any>,
    config?: Config,
    onStateUpdate?: () => any
  ) {
    // this = new API(client);
    super(client);
    const finalConfig = {
      ...defaultConfig,
      ...config,
      loadOnStart: {
        ...defaultConfig.loadOnStart,
        ...config?.loadOnStart,
      },
    };
    const { loadOnStart } = finalConfig;

    this.client = client;
    this.repository = new LocalRepository();
    this.checkout = new SaleorCheckoutAPI(
      this,
      this.repository,
      loadOnStart.checkout,
      onStateUpdate
    );
  }

  getUserDetails = (
    variables: InferOptions<QUERIES["UserDetails"]>["variables"],
    options: Omit<InferOptions<QUERIES["UserDetails"]>, "variables"> & {
      onUpdate: (data: UserDetails["me"] | null) => void;
    }
  ) => {
    if (this.isLoggedIn()) {
      return this._watchQuery(QUERIES.UserDetails, data => data.me)(
        variables,
        options
      );
    }
    if (options.onUpdate) {
      options.onUpdate(null);
    }
    return {
      refetch: () =>
        new Promise<{ data: UserDetails["me"] }>((resolve, _reject) => {
          resolve({ data: null });
        }),
      unsubscribe: () => undefined,
    };
  };

  signIn = (
    variables: InferOptions<MUTATIONS["TokenAuth"]>["variables"],
    options?: Omit<InferOptions<MUTATIONS["TokenAuth"]>, "variables">
  ) =>
    new Promise<{ data: TokenAuth["tokenCreate"] }>(async (resolve, reject) => {
      try {
        this.client.resetStore();

        const data = await this._fireQuery(
          MUTATIONS.TokenAuth,
          data => data!.tokenCreate
        )(variables, {
          ...options,
          update: (proxy, data) => {
            const handledData = handleDataErrors(
              (data: any) => data.tokenCreate,
              data.data,
              data.errors
            );
            if (!handledData.errors && handledData.data) {
              setAuthToken(handledData.data.token);
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

  signOut = () =>
    new Promise(async (resolve, reject) => {
      try {
        clearStorage();
        if (
          navigator.credentials &&
          navigator.credentials.preventSilentAccess
        ) {
          navigator.credentials.preventSilentAccess();
        }
        this.client.resetStore();

        resolve();
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
}

// error handler
const handleDataErrors = <T extends QueryShape, TData>(
  mapFn: MapFn<T, TData> | WatchMapFn<T, TData>,
  data: TData,
  apolloErrors?: readonly GraphQLError[]
) => {
  // INFO: user input errors will be moved to graphql errors
  const userInputErrors = getErrorsFromData(data);
  const errors =
    apolloErrors || userInputErrors
      ? new ApolloError({
          extraInfo: userInputErrors,
          graphQLErrors: apolloErrors,
        })
      : null;

  if (errors && isDataEmpty(data)) {
    return { errors };
  }

  const result = getMappedData(mapFn, data);

  return { data: result };
};
