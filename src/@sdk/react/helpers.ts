import React from "react";

import { SaleorAPI } from "../";
import { getAuthToken, removeAuthToken } from "../auth";
import { SaleorContext } from "./context";

export function useSaleorClient(): SaleorAPI {
  const saleor = React.useContext(SaleorContext);

  if (!saleor) {
    throw new Error(
      "Could not find saleor's apollo client in the context. " +
        "Did you forget to wrap the root component in a <SaleorProvider>?"
    );
  }
  return saleor;
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
  }, [authenticated]);

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
