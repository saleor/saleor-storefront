import {
  ApolloClient,
  MutationOptions as ApolloMutationOptions
} from "apollo-client";
import gql from "graphql-tag";

import * as Address from "./address";
import * as Auth from "./auth";
import * as Checkout from "./checkout";
import {
  createCheckout,
  createCheckoutVariables
} from "./types/createCheckout";
import {
  DeleteUserAddress,
  DeleteUserAddressVariables
} from "./types/DeleteUserAddress";
import {
  SetCustomerDefaultAddress,
  SetCustomerDefaultAddressVariables
} from "./types/SetCustomerDefaultAddress";
import { TokenAuth, TokenAuthVariables } from "./types/TokenAuth";
import {
  updateCheckoutBillingAddress,
  updateCheckoutBillingAddressVariables
} from "./types/updateCheckoutBillingAddress";
import {
  updateCheckoutShippingAddress,
  updateCheckoutShippingAddressVariables
} from "./types/updateCheckoutShippingAddress";

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
  CreateCheckout: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<createCheckout, createCheckoutVariables>
  ) =>
    client.mutate({
      mutation: gql`
        ${Checkout.createCheckoutMutation}
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
  UpdateCheckoutShippingAddress: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<
      updateCheckoutShippingAddress,
      updateCheckoutShippingAddressVariables
    >
  ) =>
    client.mutate({
      mutation: gql`
        ${Checkout.updateCheckoutShippingAddressMutation}
      `,
      ...options,
    }),
};

export type MUTATIONS = typeof MUTATIONS;
