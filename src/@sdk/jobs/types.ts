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
