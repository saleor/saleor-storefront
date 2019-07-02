import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import urljoin from "url-join";

import { MutationOptions, MUTATIONS } from "./mutations";
import { QUERIES, QueryOptions } from "./queries";

export const createSaleorClient = (url?: string) =>
  // TODO: Create boiletplate apollo client config
  new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: urljoin(url || "/", "/graphql/"),
    }),
  });

type InferOptions<T> = T extends (c, o: infer O) => any ? O : never;

export class SaleorAPI {
  client: ApolloClient<any>;

  constructor(client: ApolloClient<any>) {
    this.client = client;
  }

  getProductDetails = (options: InferOptions<QUERIES["ProductDetails"]>) =>
    QUERIES.ProductDetails(this.client, options);

  setAuthToken = (options: InferOptions<MUTATIONS["TokenAuth"]>) =>
    MUTATIONS.TokenAuth(this.client, options);
}
