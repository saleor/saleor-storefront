import { ApolloError } from "apollo-client";
import { PasswordChange } from "../mutations/gqlTypes/PasswordChange";
import { SetPassword } from "../mutations/gqlTypes/SetPassword";
import { TokenAuth_tokenCreate } from "../mutations/gqlTypes/TokenAuth";

export interface ErrorResponse<T> {
  error?: any;
  type?: T;
}

export interface FunctionQueueResponse {
  pending: boolean;
}
export interface FunctionRunResponse<D, F> {
  data?: any;
  dataError?: ErrorResponse<D>;
  functionError?: ErrorResponse<F>;
  pending: boolean;
}

export type PromiseQueuedResponse = Promise<FunctionQueueResponse>;
export type PromiseRunResponse<D, F> = Promise<FunctionRunResponse<D, F>>;

export type SignIn = {
  data: TokenAuth_tokenCreate | null;
  error: ApolloError | null;
} | null;

export type SetPasswordChange = {
  data: PasswordChange | null;
  error: ApolloError | null;
} | null;

export type SetPasswordResult = {
  data: SetPassword | null;
  error: ApolloError | null;
} | null;
