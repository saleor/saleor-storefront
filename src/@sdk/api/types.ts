export interface FunctionResponse {
  pending: boolean;
}

export type PromiseResponse = Promise<FunctionResponse>;
