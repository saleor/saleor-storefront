import * as React from "react";

import { useShopDetails } from "@saleor/sdk";
import { maybe } from "../../core/utils";
import { defaultContext, ShopContext } from "./context";

const ShopProvider: React.FC = ({ children }) => {
  const { data } = useShopDetails();
  return (
    <ShopContext.Provider value={maybe(() => data.shop, defaultContext)}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopProvider;
