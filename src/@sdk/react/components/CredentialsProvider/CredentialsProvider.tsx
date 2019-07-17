import React from "react";

import { useAuth, useSignIn } from "../..";
import { IProps } from "./types";

export function CredentialsProvider({
  children,
}: IProps): React.ReactElement<IProps> {
  const { authenticated } = useAuth();
  const [signIn] = useSignIn();

  const autoSignIn = async () => {
    const credentials = await navigator.credentials.get({
      mediation: "optional",
      password: true,
    });

    if (credentials) {
      await signIn({
        email: credentials.id,
        password: credentials.password,
      });
    }
  };

  React.useEffect(() => {
    if (!authenticated && window.PasswordCredential) {
      autoSignIn();
    }
  }, [authenticated]);

  return <>{children}</>;
}
