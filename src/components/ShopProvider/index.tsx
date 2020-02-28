import * as React from "react";

import { maybe } from "../../core/utils";
import { defaultContext, ShopContext } from "./context";

import { useShopDetails } from "@sdk/react";

const ShopProvider: React.FC = ({ children }) => {
  const { data } = useShopDetails();
  return (
    <ShopContext.Provider value={maybe(() => data.shop, defaultContext)}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopProvider;
