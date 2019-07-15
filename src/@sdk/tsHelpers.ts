// general
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> &
      Partial<Record<Exclude<Keys, K>, undefined>>;
  }[Keys];

export type KeysMatching<T, V> = T[{
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T]];

// sdk specific
export type InferOptions<T> = T extends (c, o: infer O) => any ? O : never;

export type NestedData<T> = KeysMatching<T, { [key: string]: any }>;

export type QueryData<T extends (...args: any) => any> = ReturnType<
  T
> extends Promise<infer R>
  ? R extends { [key: string]: any }
    ? R["data"]
    : {}
  : never;

export type ReturnData<
  T extends { [key: string]: (...args: any) => any },
  N extends keyof T
> = ReturnType<T[N]> extends Promise<infer R>
  ? R extends { [key: string]: any }
    ? NestedData<R["data"]>
    : {}
  : never;
