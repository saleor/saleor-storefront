import { ObservableQuery } from "apollo-client";

export type QueryShape = (...args: any) => any;

export type MapFn<T extends QueryShape, TResult> = (
  data: QueryData<T>
) => TResult;

export type WatchMapFn<T extends QueryShape, TResult> = (
  data: WatchQueryData<T>
) => TResult;

export type InferOptions<T> = T extends (_: any, o: infer O) => any ? O : never;

export type QueryData<T extends (...args: any) => any> = ReturnType<
  T
> extends Promise<infer R>
  ? R extends { [key: string]: any }
    ? R["data"]
    : null
  : never;

export type WatchQueryData<T extends (...args: any) => any> = ReturnType<
  T
> extends ObservableQuery<infer R>
  ? R
  : never;

export interface Config {
  loadOnStart: {
    checkout: boolean;
    cart: boolean;
  };
}
