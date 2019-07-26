import ApolloClient from "apollo-client";

export interface IProps<TCacheShape> {
  children: React.ReactElement;
  client: ApolloClient<TCacheShape>;
}
