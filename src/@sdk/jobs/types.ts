export enum LocalStorageJobs {
  CHECKOUT_SET_CART_ITEM = "job_checkoutSetCartItem",
  CHECKOUT_SET_SHIPPING_ADDRESS = "job_checkoutSetShippingAddress",
  CHECKOUT_SET_BILLING_ADDRESS = "job_checkoutSetBillingAddress",
}

export interface IJobQueue {
  addToQueue: (
    name: LocalStorageJobs,
    func: () => any,
    onPending: () => any,
    onFinish: () => any
  ) => void;
}
