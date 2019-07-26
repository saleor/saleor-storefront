import React from "react";

import { CredentialsProvider } from "../";
import { SaleorAPI } from "../../../";
import { SaleorContext } from "../../context";
import { IProps } from "./types";

export function SaleorProvider<TCacheShape = any>({
  client,
  children,
}: IProps<TCacheShape>): React.ReactElement<IProps<TCacheShape>> {
  return (
    <SaleorContext.Provider value={new SaleorAPI(client)}>
      <CredentialsProvider>{children}</CredentialsProvider>
    </SaleorContext.Provider>
  );
}
