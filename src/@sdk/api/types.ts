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
