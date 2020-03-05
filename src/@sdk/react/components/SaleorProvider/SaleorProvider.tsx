import React, { useMemo } from "react";

import { CredentialsProvider } from "../";
import { SaleorAPI } from "../../../";
import { SaleorContext } from "../../context";
import { IProps } from "./types";

export function SaleorProvider<TCacheShape = any>({
  client,
  children,
}: IProps<TCacheShape>): React.ReactElement<IProps<TCacheShape>> {
  const context = useMemo(() => {
    return new SaleorAPI(client);
  }, [client]);

  return (
    <SaleorContext.Provider value={context}>
      <CredentialsProvider>{children}</CredentialsProvider>
    </SaleorContext.Provider>
  );
}
