import { ApolloClientManager } from "../data/ApolloClientManager";
import { LocalStorageHandler } from "../helpers/LocalStorageHandler";
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
    localStorageHandler: LocalStorageHandler,
    apolloClientManager: ApolloClientManager
  ) {
    this.cart = new CartQueuedJobs(localStorageHandler, apolloClientManager);
    this.checkout = new CheckoutQueuedJobs();
  }
}
