import { NetworkManager } from "@sdk/network";
import { LocalRepository } from "@sdk/repository";

import { QueuedJobsHandler } from "../QueuedJobsHandler";

export enum ErrorCartTypes {
  "SET_CART_ITEM",
}

export class CartQueuedJobs extends QueuedJobsHandler<ErrorCartTypes> {
  private networkManager: NetworkManager;
  private repository: LocalRepository;

  constructor(repository: LocalRepository, networkManager: NetworkManager) {
    super();
    this.repository = repository;
    this.networkManager = networkManager;
  }

  setCartItem = async () => {
    const checkout = this.repository.getCheckout();

    if (checkout) {
      const { data, error } = await this.networkManager.setCartItem(checkout);
      if (error && this.onErrorListener) {
        this.onErrorListener(error, ErrorCartTypes.SET_CART_ITEM);
      } else if (data) {
        this.repository.setCheckout({
          ...checkout,
          lines: data.lines,
          promoCodeDiscount: data.promoCodeDiscount,
        });
      }
    }
  };
}
