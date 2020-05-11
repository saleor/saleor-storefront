import {
  ApolloClient,
  MutationOptions as ApolloMutationOptions,
} from "apollo-client";

import * as Address from "./address";
import * as Auth from "./auth";
import * as Checkout from "./checkout";
import * as User from "./user";

import {
  CreateCheckout,
  CreateCheckoutVariables,
} from "./types/CreateCheckout";
import {
  DeleteUserAddress,
  DeleteUserAddressVariables,
} from "./types/DeleteUserAddress";

import {
  CreateUserAddress,
  CreateUserAddressVariables,
} from "./types/CreateUserAddress";

import {
  SetCustomerDefaultAddress,
  SetCustomerDefaultAddressVariables,
} from "./types/SetCustomerDefaultAddress";

import {
  UpdateUserAddress,
  UpdateUserAddressVariables,
} from "./types/UpdateUserAddress";

import { SetPassword, SetPasswordVariables } from "./types/SetPassword";

import { TokenAuth, TokenAuthVariables } from "./types/TokenAuth";
import {
  UpdateCheckoutBillingAddress,
  UpdateCheckoutBillingAddressVariables,
} from "./types/UpdateCheckoutBillingAddress";
import {
  UpdateCheckoutLine,
  UpdateCheckoutLineVariables,
} from "./types/UpdateCheckoutLine";
import {
  UpdateCheckoutShippingAddress,
  UpdateCheckoutShippingAddressVariables,
} from "./types/UpdateCheckoutShippingAddress";

import {
  UpdateCheckoutBillingAddressWithEmail,
  UpdateCheckoutBillingAddressWithEmailVariables,
} from "./types/UpdateCheckoutBillingAddressWithEmail";

import {
  UpdateCheckoutShippingMethod,
  UpdateCheckoutShippingMethodVariables,
} from "./types/UpdateCheckoutShippingMethod";

import {
  PasswordChange,
  PasswordChangeVariables,
} from "./types/PasswordChange";

import {
  AddCheckoutPromoCode,
  AddCheckoutPromoCodeVariables,
} from "./types/AddCheckoutPromoCode";

import {
  RemoveCheckoutPromoCode,
  RemoveCheckoutPromoCodeVariables,
} from "./types/RemoveCheckoutPromoCode";

import {
  CreateCheckoutPayment,
  CreateCheckoutPaymentVariables,
} from "./types/CreateCheckoutPayment";

import {
  CompleteCheckout,
  CompleteCheckoutVariables,
} from "./types/CompleteCheckout";

import { AccountUpdate, AccountUpdateVariables } from "./types/AccountUpdate";

export type MutationOptions<TData, TVariables> = Omit<
  ApolloMutationOptions<TData, TVariables>,
  "mutation"
>;

// TODO: Add ability to pass custom fragments to mutations
export const MUTATIONS = {
  AccountUpdate: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<AccountUpdate, AccountUpdateVariables>
  ) =>
    client.mutate({
      mutation: User.accountUpdate,
      ...options,
    }),
  AddCheckoutPromoCode: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<
      AddCheckoutPromoCode,
      AddCheckoutPromoCodeVariables
    >
  ) =>
    client.mutate({
      mutation: Checkout.addCheckoutPromoCode,
      ...options,
    }),
  AddressTypeUpdate: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<
      SetCustomerDefaultAddress,
      SetCustomerDefaultAddressVariables
    >
  ) =>
    client.mutate({
      mutation: Address.setCustomerDefaultAddress,
      ...options,
    }),
  CompleteCheckout: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<CompleteCheckout, CompleteCheckoutVariables>
  ) =>
    client.mutate({
      mutation: Checkout.completeCheckoutMutation,
      ...options,
    }),
  CreateCheckout: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<CreateCheckout, CreateCheckoutVariables>
  ) =>
    client.mutate({
      mutation: Checkout.createCheckoutMutation,
      ...options,
    }),
  CreateCheckoutPayment: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<
      CreateCheckoutPayment,
      CreateCheckoutPaymentVariables
    >
  ) =>
    client.mutate({
      mutation: Checkout.createCheckoutPaymentMutation,
      ...options,
    }),
  CreateUserAddress: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<CreateUserAddress, CreateUserAddressVariables>
  ) =>
    client.mutate({
      mutation: Address.createUserAddress,
      ...options,
    }),
  DeleteUserAddress: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<DeleteUserAddress, DeleteUserAddressVariables>
  ) =>
    client.mutate({
      mutation: Address.deleteUserAddress,
      ...options,
    }),
  PasswordChange: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<PasswordChange, PasswordChangeVariables>
  ) =>
    client.mutate({
      mutation: User.changeUserPassword,
      ...options,
    }),
  RemoveCheckoutPromoCode: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<
      RemoveCheckoutPromoCode,
      RemoveCheckoutPromoCodeVariables
    >
  ) =>
    client.mutate({
      mutation: Checkout.removeCheckoutPromoCode,
      ...options,
    }),
  SetPassword: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<SetPassword, SetPasswordVariables>
  ) =>
    client.mutate({
      mutation: User.setPassword,
      ...options,
    }),
  TokenAuth: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<TokenAuth, TokenAuthVariables>
  ) =>
    client.mutate({
      mutation: Auth.tokenAuthMutation,
      ...options,
    }),
  UpdateCheckoutBillingAddress: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<
      UpdateCheckoutBillingAddress,
      UpdateCheckoutBillingAddressVariables
    >
  ) =>
    client.mutate({
      mutation: Checkout.updateCheckoutBillingAddressMutation,
      ...options,
    }),
  UpdateCheckoutBillingAddressWithEmail: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<
      UpdateCheckoutBillingAddressWithEmail,
      UpdateCheckoutBillingAddressWithEmailVariables
    >
  ) =>
    client.mutate({
      mutation: Checkout.updateCheckoutBillingAddressWithEmailMutation,
      ...options,
    }),
  UpdateCheckoutLine: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<UpdateCheckoutLine, UpdateCheckoutLineVariables>
  ) =>
    client.mutate({
      mutation: Checkout.updateCheckoutLineMutation,
      ...options,
    }),
  UpdateCheckoutShippingAddress: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<
      UpdateCheckoutShippingAddress,
      UpdateCheckoutShippingAddressVariables
    >
  ) =>
    client.mutate({
      mutation: Checkout.updateCheckoutShippingAddressMutation,
      ...options,
    }),
  UpdateCheckoutShippingMethod: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<
      UpdateCheckoutShippingMethod,
      UpdateCheckoutShippingMethodVariables
    >
  ) =>
    client.mutate({
      mutation: Checkout.updateCheckoutShippingMethodMutation,
      ...options,
    }),
  UpdateUserAddress: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<UpdateUserAddress, UpdateUserAddressVariables>
  ) =>
    client.mutate({
      mutation: Address.updateUserAddress,
      ...options,
    }),
};

export type MUTATIONS = typeof MUTATIONS;
