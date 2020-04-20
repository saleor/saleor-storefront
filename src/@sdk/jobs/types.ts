import {
  DataErrorCheckoutTypes,
  FunctionErrorCheckoutTypes,
} from "../api/Checkout/types";

export enum LocalStorageJobs {
  CHECKOUT_SET_CART_ITEM = "job_checkoutSetCartItem",
}

export interface IJobQueue {
  addToQueue: (
    name: LocalStorageJobs,
    func: () => any,
    onPending: () => any,
    onFinish: () => any
  ) => void;
}

export interface JobErrorResponse<T> {
  error?: any;
  type?: T;
}

export interface JobRunResponse<D, F> {
  data?: any;
  dataError?: JobErrorResponse<D>;
}

export type PromiseCheckoutJobRunResponse = Promise<
  JobRunResponse<DataErrorCheckoutTypes, FunctionErrorCheckoutTypes>
>;
