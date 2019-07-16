import React from "react";

import { getAuthToken, removeAuthToken } from "../auth";

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
