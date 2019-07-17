import ApolloClient from "apollo-client";
import React from "react";

export const ApolloContext = React.createContext<null | ApolloClient<any>>(
  null
);

export function useSaleorClient<TCache = object>(): ApolloClient<TCache> {
  const client = React.useContext(ApolloContext);

  if (!client) {
    throw new Error(
      "Could not find Saleor's apollo client in the context. " +
        "Did you forget to wrap the root component in a <SaleorProvider>?"
    );
  }
  return client;
}
