import React, { useEffect, useMemo, useState } from "react";

import { CredentialsProvider } from "../";
import { SaleorAPI, API } from "../../../";
import { SaleorCheckoutAPIState } from "../../../api/Checkout";
import { SaleorContext } from "../../context";
import { IProps } from "./types";

export function SaleorProvider<TCacheShape = any>({
  client,
  config,
  children,
}: IProps<TCacheShape>): React.ReactElement<IProps<TCacheShape>> {
  const [context, setContext] = useState<SaleorAPI | null>(null);

  const onStateUpdate = () => {
    console.log("context onStateUpdate");
    setContext(context => {
      if (context) {
        return {
          ...context,
        };
      } else {
        return context;
      }
    });
  };

  useEffect(() => {
    setContext(new SaleorAPI(client, config, onStateUpdate));
  }, []);

  // const contextMemo = useMemo(() => {
  //   return new SaleorAPI(client, config, onStateUpdate);
  // }, [client]);

  console.log(context);

  return (
    <SaleorContext.Provider value={context}>
      {context ? <CredentialsProvider>{children}</CredentialsProvider> : <></>}
    </SaleorContext.Provider>
  );
}
