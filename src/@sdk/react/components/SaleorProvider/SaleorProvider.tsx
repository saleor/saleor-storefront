import React, { useMemo } from "react";

import { CredentialsProvider } from "../";
import { SaleorAPI, SaleorSDK } from "../../../";
import { SaleorContext } from "../../context";
import { IProps } from "./types";

export function SaleorProvider<TCacheShape = any>({
  client,
  children,
}: IProps<TCacheShape>): React.ReactElement<IProps<TCacheShape>> {
  const context = useMemo(() => {
    const api = new SaleorAPI(client);
    const sdk = new SaleorSDK(api);

    return {
      api,
      sdk,
    };
  }, [client]);

  return (
    <SaleorContext.Provider value={context}>
      <CredentialsProvider>{children}</CredentialsProvider>
    </SaleorContext.Provider>
  );
}
