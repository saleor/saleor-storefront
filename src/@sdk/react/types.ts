import { ApolloError } from "apollo-client";
import { SaleorAPI } from "..";

export interface ApolloErrorWithUserInput extends ApolloError {
  extraInfo: {
    userInputErrors?: any[];
  };
}

export type Variables<T extends keyof SaleorAPI> = SaleorAPI[T] extends (
  variables: infer V,
  _: any
) => any
  ? V
  : never;

export type Options<T extends keyof SaleorAPI> = SaleorAPI[T] extends (
  _: any,
  options: infer V
) => any
  ? V
  : never;

export type ReturnData<T extends keyof SaleorAPI> = SaleorAPI[T] extends (
  ...args: any
) => Promise<infer V>
  ? V extends { data: any }
    ? V
    : never
  : never;

export type WatchQueryReturnData<
  T extends keyof SaleorAPI
> = SaleorAPI[T] extends (_: any, options: infer O) => any
  ? O extends { onUpdate: (data: infer V) => any }
    ? V
    : never
  : never;
