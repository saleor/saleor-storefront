import ApolloClient from "apollo-client";

export interface IProps<TCacheShape> {
  children?: React.ReactNode;
  client: ApolloClient<TCacheShape>;
}
