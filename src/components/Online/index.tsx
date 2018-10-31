import * as React from "react";

import NetworkStatus from "../NetworkStatus";

const Online: React.SFC = ({ children }) => (
  <NetworkStatus>{online => (online ? children : null)}</NetworkStatus>
);

export default Online;
