import { OrderDetail } from "@sdk/fragments/gqlTypes/OrderDetail";
import { User } from "@sdk/fragments/gqlTypes/User";

import { PromiseQueuedResponse, PromiseRunResponse } from "../types";

export enum FunctionErrorUserTypes {}
export enum DataErrorUserTypes {
  "SIGN_IN",
}

/**
 * Not all methods are yet implemented. If they will, then respective methods from API proxy should be deleted.
 */
export interface IUserAPI {
  loaded: boolean;
  user?: User | null;
  token?: string;
  orders?: OrderDetail[];
  // loadUser: () => PromiseQueuedResponse;
  // loadOrders: () => PromiseQueuedResponse;
  signIn: (
    email: string,
    password: string
  ) => PromiseRunResponse<DataErrorUserTypes, FunctionErrorUserTypes>;
  signOut: () => PromiseRunResponse<DataErrorUserTypes, FunctionErrorUserTypes>;
  // updateAccount: () => PromiseRunResponse<
  //   DataErrorUserTypes,
  //   FunctionErrorUserTypes
  // >;
  // createAddress: () => PromiseRunResponse<
  //   DataErrorUserTypes,
  //   FunctionErrorUserTypes
  // >;
  // updateAddress: () => PromiseRunResponse<
  //   DataErrorUserTypes,
  //   FunctionErrorUserTypes
  // >;
  // deleteAddress: () => PromiseRunResponse<
  //   DataErrorUserTypes,
  //   FunctionErrorUserTypes
  // >;
  // setDefaultAddress: () => PromiseRunResponse<
  //   DataErrorUserTypes,
  //   FunctionErrorUserTypes
  // >;
}
