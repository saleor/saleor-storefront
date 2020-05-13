import { NetworkManager } from "../network";
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

  constructor(repository: LocalRepository, networkManager: NetworkManager) {
    this.cart = new CartQueuedJobs(repository, networkManager);
    this.checkout = new CheckoutQueuedJobs();
  }
}
