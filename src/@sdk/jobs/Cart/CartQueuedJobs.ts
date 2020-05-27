import { ApolloClientManager } from "@temp/@sdk/data/ApolloClientManager";
import { LocalStorageHandler } from "@temp/@sdk/helpers/LocalStorageHandler";

import { QueuedJobsHandler } from "../QueuedJobsHandler";

export enum ErrorCartTypes {
  "SET_CART_ITEM",
}

export class CartQueuedJobs extends QueuedJobsHandler<ErrorCartTypes> {
  private apolloClientManager: ApolloClientManager;
  private localStorageHandler: LocalStorageHandler;

  constructor(
    localStorageHandler: LocalStorageHandler,
    apolloClientManager: ApolloClientManager
  ) {
    super();
    this.localStorageHandler = localStorageHandler;
    this.apolloClientManager = apolloClientManager;
  }

  setCartItem = async () => {
    const checkout = this.localStorageHandler.getCheckout();

    if (checkout) {
      const { data, error } = await this.apolloClientManager.setCartItem(
        checkout
      );
      if (error && this.onErrorListener) {
        this.onErrorListener(error, ErrorCartTypes.SET_CART_ITEM);
      } else if (data) {
        this.localStorageHandler.setCheckout({
          ...checkout,
          lines: data.lines,
          promoCodeDiscount: data.promoCodeDiscount,
        });
      }
    }
  };
}
