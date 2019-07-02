import {
  ApolloClient,
  MutationOptions as ApolloMutationOptions
} from "apollo-client";
import gql from "graphql-tag";

import * as Auth from "./auth";
import { TokenAuth, TokenAuthVariables } from "./types/TokenAuth";

export type MutationOptions<TData, TVariables> = Omit<
  ApolloMutationOptions<TData, TVariables>,
  "mutation"
>;

// TODO: Add ability to pass custom fragments to mutations
export const MUTATIONS = {
  TokenAuth: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<TokenAuth, TokenAuthVariables>
  ) =>
    client.mutate({
      mutation: gql`
        ${Auth.tokenAuthMutation}
      `,
      ...options,
    }),
};

export type MUTATIONS = typeof MUTATIONS;
