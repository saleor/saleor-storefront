import * as React from "react";

import { NetworkStatus } from "./";

export const Offline: React.SFC = ({ children }) => (
  <NetworkStatus>{online => (online ? null : children)}</NetworkStatus>
);
