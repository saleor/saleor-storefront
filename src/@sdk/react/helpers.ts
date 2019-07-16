import React from "react";

import { getAuthToken } from "../auth";

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
