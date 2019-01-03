import * as React from "react";

import { default as MetaConsumer } from "./consumer";
import { MetaContextInterface, Provider as MetaProvider } from "./context";

interface MetaWrapperProps {
  meta: MetaContextInterface;
  children: React.ReactNode;
}

const MetaWrapper: React.SFC<MetaWrapperProps> = ({ children, meta }) => (
  <MetaProvider value={meta}>
    <MetaConsumer>{children}</MetaConsumer>
  </MetaProvider>
);

export default MetaWrapper;
