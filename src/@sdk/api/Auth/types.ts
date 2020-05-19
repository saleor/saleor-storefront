import { User } from "@sdk/fragments/gqlTypes/User";

import { PromiseRunResponse } from "../types";

export enum FunctionErrorAuthTypes {}
export enum DataErrorAuthTypes {
  "SIGN_IN",
}

export interface IAuthAPI {
  loaded: boolean;
  user?: User | null;
  token?: string;
  signIn: (
    email: string,
    password: string,
    autoSignIn?: boolean
  ) => PromiseRunResponse<DataErrorAuthTypes, FunctionErrorAuthTypes>;
  signOut: () => PromiseRunResponse<DataErrorAuthTypes, FunctionErrorAuthTypes>;
}
