import React from "react";

import { SaleorAPI } from "../index";

export const SaleorContext = React.createContext<SaleorAPI | null>(null);
