import { ApolloClientManager } from "../data/ApolloClientManager";
import { LocalStorageHandler } from "../helpers/LocalStorageHandler";
import { CartJobs } from "./Cart";
import { CheckoutJobs } from "./Checkout";

export interface IJobs {
  cart: CartJobs;
  checkout: CheckoutJobs;
}

export class Jobs implements IJobs {
  cart: CartJobs;
  checkout: CheckoutJobs;

  constructor(
    localStorageHandler: LocalStorageHandler,
    apolloClientManager: ApolloClientManager
  ) {
    this.cart = new CartJobs();
    this.checkout = new CheckoutJobs(localStorageHandler, apolloClientManager);
  }
}
