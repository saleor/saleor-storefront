import React, { useState } from "react";

import { ShopConfig } from "@utils/ssr";

import { defaultContext, ShopContext } from "./context";

type ShopProviderPops = { shopConfig: ShopConfig["shopConfig"] };

const ShopProvider: React.FC<ShopProviderPops> = ({ shopConfig, children }) => {
  const [context] = useState<ShopConfig["shopConfig"]>({
    ...defaultContext,
    ...shopConfig,
  });

  return (
    <ShopContext.Provider value={context}>{children}</ShopContext.Provider>
  );
};

export default ShopProvider;
