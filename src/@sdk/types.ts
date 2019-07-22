export type QueryShape = (...args: any) => any;

export type MapFn<T extends QueryShape, TResult> = (
  data: QueryData<T>
) => TResult;

export type InferOptions<T> = T extends (c, o: infer O) => any ? O : never;

export type QueryData<T extends (...args: any) => any> = ReturnType<
  T
> extends Promise<infer R>
  ? R extends { [key: string]: any }
    ? R["data"]
    : {}
  : never;
