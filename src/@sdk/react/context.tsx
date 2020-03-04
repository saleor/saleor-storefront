import React from "react";

import { SaleorAPI, SaleorSDK } from "../index";

export const SaleorContext = React.createContext<{
  api: null | SaleorAPI;
  sdk: null | SaleorSDK;
}>({ api: null, sdk: null });
