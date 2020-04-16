export enum LocalStorageJobs {
  CHECKOUT_SET_CART_ITEM = "job_checkoutSetCartItem",
  CHECKOUT_SET_SHIPPING_METHOD = "job_checkoutSetShippingMethod",
}

export interface IJobQueue {
  addToQueue: (
    name: LocalStorageJobs,
    func: () => any,
    onPending: () => any,
    onFinish: () => any
  ) => void;
}
