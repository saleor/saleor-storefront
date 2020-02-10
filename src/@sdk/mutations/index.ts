import {
  ApolloClient,
  MutationOptions as ApolloMutationOptions,
} from "apollo-client";
import gql from "graphql-tag";

import * as Address from "./address";
import * as Auth from "./auth";
import * as Checkout from "./checkout";
import * as User from "./user";
import * as Wishlist from "./whishlist";

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
  UpdateCheckoutShippingAddress,
  UpdateCheckoutShippingAddressVariables,
} from "./types/UpdateCheckoutShippingAddress";

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

import { AccountUpdate, AccountUpdateVariables } from "./types/AccountUpdate";

import {
  AddWishlistProduct,
  AddWishlistProductVariables,
} from "./types/AddWishlistProduct";

import {
  RemoveWishlistProduct,
  RemoveWishlistProductVariables,
} from "./types/RemoveWishlistProduct";

import {
  AddWishlistProductVariant,
  AddWishlistProductVariantVariables,
} from "./types/AddWishlistProductVariant";

import {
  RemoveWishlistProductVariant,
  RemoveWishlistProductVariantVariables,
} from "./types/RemoveWishlistProductVariant";

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
      mutation: gql`
        ${User.accountUpdate}
      `,
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
      mutation: gql`
        ${Checkout.addCheckoutPromoCode}
      `,
      ...options,
    }),
  AddWishlistProduct: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<AddWishlistProduct, AddWishlistProductVariables>
  ) =>
    client.mutate({
      mutation: gql`
        ${Wishlist.addWhishlistProduct}
      `,
      ...options,
    }),
  AddWishlistProductVariant: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<
      AddWishlistProductVariant,
      AddWishlistProductVariantVariables
    >
  ) =>
    client.mutate({
      mutation: gql`
        ${Wishlist.addWhishlistProductVariant}
      `,
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
      mutation: gql`
        ${Address.setCustomerDefaultAddress}
      `,
      ...options,
    }),
  CreateCheckout: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<CreateCheckout, CreateCheckoutVariables>
  ) =>
    client.mutate({
      mutation: gql`
        ${Checkout.createCheckoutMutation}
      `,
      ...options,
    }),
  CreateUserAddress: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<CreateUserAddress, CreateUserAddressVariables>
  ) =>
    client.mutate({
      mutation: gql`
        ${Address.createUserAddress}
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
  PasswordChange: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<PasswordChange, PasswordChangeVariables>
  ) =>
    client.mutate({
      mutation: gql`
        ${User.changeUserPassword}
      `,
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
      mutation: gql`
        ${Checkout.removeCheckoutPromoCode}
      `,
      ...options,
    }),
  RemoveWishlistProduct: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<
      RemoveWishlistProduct,
      RemoveWishlistProductVariables
    >
  ) =>
    client.mutate({
      mutation: gql`
        ${Wishlist.removeWhishlistProduct}
      `,
      ...options,
    }),
  RemoveWishlistProductVariant: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<
      RemoveWishlistProductVariant,
      RemoveWishlistProductVariantVariables
    >
  ) =>
    client.mutate({
      mutation: gql`
        ${Wishlist.removeWhishlistProductVariant}
      `,
      ...options,
    }),
  SetPassword: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<SetPassword, SetPasswordVariables>
  ) =>
    client.mutate({
      mutation: gql`
        ${User.setPassword}
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
      UpdateCheckoutBillingAddress,
      UpdateCheckoutBillingAddressVariables
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
      UpdateCheckoutShippingAddress,
      UpdateCheckoutShippingAddressVariables
    >
  ) =>
    client.mutate({
      mutation: gql`
        ${Checkout.updateCheckoutShippingAddressMutation}
      `,
      ...options,
    }),
  UpdateUserAddress: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: MutationOptions<UpdateUserAddress, UpdateUserAddressVariables>
  ) =>
    client.mutate({
      mutation: gql`
        ${Address.updateUserAddress}
      `,
      ...options,
    }),
};

export type MUTATIONS = typeof MUTATIONS;
