import * as React from "react";

import { NetworkStatus } from "./";

export const Online: React.SFC = ({ children }) => (
  <NetworkStatus>{online => (online ? children : null)}</NetworkStatus>
);
