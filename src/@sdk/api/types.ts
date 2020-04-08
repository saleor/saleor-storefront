export interface FunctionQueueResponse {
  pending: boolean;
}
export interface FunctionRunResponse {
  data?: any;
  pending: boolean;
}

export type PromiseQueuedResponse = Promise<FunctionQueueResponse>;
export type PromiseRunResponse = Promise<FunctionRunResponse>;
