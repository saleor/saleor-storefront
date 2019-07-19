import React from "react";

import { SaleorAPI } from "../index";

export const SaleorContext = React.createContext<null | SaleorAPI>(null);
