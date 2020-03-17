import ApolloClient from "apollo-client";

import { Config } from "@sdk/types";

export interface IProps<TCacheShape> {
  children: React.ReactElement;
  config?: Config;
  client: ApolloClient<TCacheShape>;
}
