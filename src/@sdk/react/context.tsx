import ApolloClient from "apollo-client";
import React from "react";

const ApolloContext = React.createContext<null | ApolloClient<any>>(null);

interface SaleorProviderProps<TCacheShape> {
  children?: React.ReactNode;
  client: ApolloClient<TCacheShape>;
}

export function SaleorProvider<TCacheShape = any>({
  client,
  children,
}: SaleorProviderProps<TCacheShape>): React.ReactElement<
  SaleorProviderProps<TCacheShape>
> {
  return (
    <ApolloContext.Provider value={client}>{children}</ApolloContext.Provider>
  );
}

export function useSaleorClient<TCache = object>(): ApolloClient<TCache> {
  const client = React.useContext(ApolloContext);

  if (!client) {
    throw new Error(
      "Could not find saleor's apollo client in the context. " +
        "Did you forget to wrap the root component in a <SaleorProvider>?"
    );
  }
  return client;
}
