import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import urljoin from "url-join";

import { MUTATIONS } from "./mutations";
import { QUERIES } from "./queries";

type InferOptions<T> = T extends (c, o: infer O) => any ? O : never;

export const createSaleorClient = (url?: string) =>
  // TODO: Create default apollo client config for most users
  new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: urljoin(url || "/", "/graphql/"),
    }),
  });

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
