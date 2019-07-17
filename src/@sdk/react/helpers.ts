import ApolloClient from "apollo-client";
import React from "react";

import { getAuthToken, removeAuthToken } from "../auth";
import { ApolloContext } from "./context";

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

export const useAuth = (
  stateChangeCallback?: (authenticated?: boolean) => void
) => {
  const [authenticated, setAuthenticated] = React.useState(!!getAuthToken());
  const eventHandler = () => {
    const newState = !!getAuthToken();

    if (stateChangeCallback && authenticated !== newState) {
      stateChangeCallback(newState);
    }

    setAuthenticated(newState);
  };

  React.useEffect(() => {
    addEventListener("auth", eventHandler);

    return () => {
      removeEventListener("auth", eventHandler);
    };
  });

  return { authenticated };
};

export const useSignOut = () => [
  () => {
    removeAuthToken();
    if (navigator.credentials && navigator.credentials.preventSilentAccess) {
      navigator.credentials.preventSilentAccess();
    }
  },
];
