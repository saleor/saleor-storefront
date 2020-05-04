import React from "react";

import { SaleorAPI } from "../api";

export const SaleorContext = React.createContext<SaleorAPI | null>(null);
