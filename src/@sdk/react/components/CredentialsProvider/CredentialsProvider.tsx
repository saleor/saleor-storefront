import React from "react";

import { useSaleorClient, useSignIn } from "../..";
import { IProps } from "./types";

export function CredentialsProvider({
  children,
}: IProps): React.ReactElement<IProps> {
  const saleor = useSaleorClient();
  const [signIn] = useSignIn();

  const autoSignIn = async () => {
    const credentials = await (navigator.credentials as any).get({
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
    if (!saleor.legacyAPIProxy.isLoggedIn() && window.PasswordCredential) {
      autoSignIn();
    }
  }, []);

  return children;
}
