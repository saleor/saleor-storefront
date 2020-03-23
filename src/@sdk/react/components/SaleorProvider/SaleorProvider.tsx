import React, { useMemo, useState } from "react";

import { CredentialsProvider } from "../";
import { SaleorManager } from "../../../";
import { SaleorAPI } from "../../../api";
import { SaleorContext } from "../../context";
import { IProps } from "./types";

export function SaleorProvider<TCacheShape = any>({
  client,
  config,
  children,
}: IProps<TCacheShape>): React.ReactElement<IProps<TCacheShape>> {
  const [context, setContext] = useState<SaleorAPI | null>(null);

  useMemo(() => {
    const manager = new SaleorManager(client, config);

    manager.connect(saleorAPI => setContext({ ...saleorAPI }));

    return manager;
  }, [client]);

  return (
    <SaleorContext.Provider value={context}>
      {context ? <CredentialsProvider>{children}</CredentialsProvider> : <></>}
    </SaleorContext.Provider>
  );
}
