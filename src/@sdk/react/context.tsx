import ApolloClient from "apollo-client";
import React from "react";

import { useAuth, useSignIn } from "@sdk/react";

const ApolloContext = React.createContext<null | ApolloClient<any>>(null);

interface SaleorProviderProps<TCacheShape> {
  children?: React.ReactNode;
  client: ApolloClient<TCacheShape>;
}

interface CredentialProviderProps {
  children?: React.ReactNode;
}

export function CredentialsProvider({
  children,
}: CredentialProviderProps): React.ReactElement<CredentialProviderProps> {
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

export function SaleorProvider<TCacheShape = any>({
  client,
  children,
}: SaleorProviderProps<TCacheShape>): React.ReactElement<
  SaleorProviderProps<TCacheShape>
> {
  return (
    <ApolloContext.Provider value={client}>
      <CredentialsProvider>{children}</CredentialsProvider>
    </ApolloContext.Provider>
  );
}

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
