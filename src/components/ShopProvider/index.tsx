import * as React from "react";

import { ShopConfig } from "@utils/ssr";

import { defaultContext, ShopContext } from "./context";

type ShopProviderPops = { shopConfig: ShopConfig["shopConfig"] };

const ShopProvider: React.FC<ShopProviderPops> = ({ shopConfig, children }) => (
  <ShopContext.Provider value={{ ...defaultContext, ...shopConfig }}>
    {children}
  </ShopContext.Provider>
);

export default ShopProvider;
