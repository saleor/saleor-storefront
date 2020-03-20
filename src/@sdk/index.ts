import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { BatchHttpLink } from "apollo-link-batch-http";
import { RetryLink } from "apollo-link-retry";
import urljoin from "url-join";

import { SaleorAPI } from "./api";
import { APIProxy } from "./api/APIProxy";
import { authLink, invalidTokenLink } from "./auth";
import { Config } from "./types";

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

export class SaleorManager {
  apiProxy: APIProxy;
  api: SaleorAPI;
  apiChangeListener: ((api: SaleorAPI) => any) | undefined;

  constructor(client: ApolloClient<any>, config?: Config) {
    this.apiProxy = new APIProxy(client);
    this.api = new SaleorAPI(this.apiProxy, config, this.onSaleorAPIChange);
  }

  connect(apiChangeListener: (api: SaleorAPI) => any) {
    this.apiChangeListener = apiChangeListener;
    this.apiChangeListener(this.api);
  }

  private onSaleorAPIChange = () => {
    if (this.apiChangeListener) {
      this.apiChangeListener(this.api);
    }
  };
}
