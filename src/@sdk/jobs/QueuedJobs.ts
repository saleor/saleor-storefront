import { CheckoutNetworkManager } from "../network";
import { LocalRepository } from "../repository";
import { CartQueuedJobs } from "./Cart";
import { CheckoutQueuedJobs } from "./Checkout";

export interface IQueuedJobs {
  cart: CartQueuedJobs;
  checkout: CheckoutQueuedJobs;
}

export class QueuedJobs implements IQueuedJobs {
  cart: CartQueuedJobs;
  checkout: CheckoutQueuedJobs;

  constructor(
    repository: LocalRepository,
    checkoutNetworkManager: CheckoutNetworkManager
  ) {
    this.cart = new CartQueuedJobs(repository, checkoutNetworkManager);
    this.checkout = new CheckoutQueuedJobs();
  }
}
