import React from "react";

import { useAuth, useSignIn } from "@sdk/react";

import { IProps } from "./types";

export const CredentialsProvider: React.FC<IProps> = ({ children }) => {
  const { authenticated } = useAuth();
  const [ signIn ] = useSignIn();

  const autoSignIn = async (silent: boolean|null) => {
    if (window.PasswordCredential) {
      const credentials = await navigator.credentials.get({
        mediation: silent ? "silent" : "optional",
        password: true,
      });

      if (credentials) {
        await signIn({
          email: credentials.id,
          password: credentials.password,
        });
      }
    }
  };

  React.useEffect(() => {
    if (!authenticated) {
      autoSignIn(false);
    }
  }, [authenticated]);

  return (
    <>
      {children}
    </>
  );
};
