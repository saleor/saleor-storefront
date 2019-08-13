import {
  ApolloClient,
  MutationOptions as ApolloMutationOptions
} from "apollo-client";
import gql from "graphql-tag";

import * as Address from "./address";
import * as Auth from "./auth";
import * as Checkout from "./checkout";
import {
  DeleteUserAddress,
  DeleteUserAddressVariables
} from "./types/DeleteUserAddress";
import {
  SetCustomerDefaultAddress,
  SetCustomerDefaultAddressVariables
} from "./types/SetCustomerDefaultAddress";
import {
  updateCheckoutBillingAddress,
  updateCheckoutBillingAddressVariables
} from "./types/updateCheckoutBillingAddress";

import { TokenAuth, TokenAuthVariables } from "./types/TokenAuth";

export type MutationOptions<TData, TVariables> = Omit<
  ApolloMutationOptions<TData, TVariables>,
  "mutation"
>;

// TODO: Add ability to pass custom fragments to mutations
export const MUTATIONS = {
  AddressTypeUpdate: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<
      SetCustomerDefaultAddress,
      SetCustomerDefaultAddressVariables
    >
  ) =>
    client.mutate({
      mutation: gql`
        ${Address.setCustomerDefaultAddress}
      `,
      ...options,
    }),
  DeleteUserAddress: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<DeleteUserAddress, DeleteUserAddressVariables>
  ) =>
    client.mutate({
      mutation: gql`
        ${Address.deleteUserAddress}
      `,
      ...options,
    }),
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
  UpdateCheckoutBillingAddress: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<
      updateCheckoutBillingAddress,
      updateCheckoutBillingAddressVariables
    >
  ) =>
    client.mutate({
      mutation: gql`
        ${Checkout.updateCheckoutBillingAddressMutation}
      `,
      ...options,
    }),
};

export type MUTATIONS = typeof MUTATIONS;
