import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import urljoin from "url-join";

import { QUERIES, SQueryOptions } from "./queries";

export const createSaleorClient = (url?: string) =>
  // TODO: Create boiletplate apollo client config
  new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: urljoin(url || "/", "/graphql/"),
    }),
  });

export class Saleor {
  client: ApolloClient<any>;

  constructor(client: ApolloClient<any>) {
    this.client = client;
  }

  getProductDetails = (options: SQueryOptions<{ id: string }>) =>
    QUERIES.ProductDetails(this.client, {
      ...options,
    });
}
