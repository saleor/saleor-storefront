import React from "react";

import { CredentialsProvider } from "../";
import { ApolloContext } from "../../context";
import { IProps } from "./types";

export function SaleorProvider<TCacheShape = any>({
  client,
  children,
}: IProps<TCacheShape>): React.ReactElement<IProps<TCacheShape>> {
  return (
    <ApolloContext.Provider value={client}>
      <CredentialsProvider>{children}</CredentialsProvider>
    </ApolloContext.Provider>
  );
}
