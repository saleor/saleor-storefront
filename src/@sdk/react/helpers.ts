import React from "react";

import { getAuthToken } from "../auth";

export const useAuth = () => {
  const [authenticated, setAuthenticated] = React.useState(!!getAuthToken());
  const eventHandler = () => {
    setAuthenticated(!!getAuthToken());
  };

  React.useEffect(() => {
    addEventListener("auth", eventHandler);

    return () => {
      removeEventListener("auth", eventHandler);
    };
  });

  return { authenticated };
};
