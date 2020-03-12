import { CheckoutNetworkManager } from "@sdk/network";
import { LocalRepository } from "@sdk/repository";

import { JobQueue } from "../JobQueue";

export class CheckoutJobQueue extends JobQueue {
  private repository: LocalRepository;
  private checkoutNetworkManager: CheckoutNetworkManager;

  constructor(
    repository: LocalRepository,
    checkoutNetworkManager: CheckoutNetworkManager
  ) {
    super();
    this.repository = repository;
    this.checkoutNetworkManager = checkoutNetworkManager;
  }

  enqueueSetCartItem() {
    this.addToQueue(async () => {
      const checkout = this.repository.getCheckout();

      if (checkout) {
        this.loading.addItemToCart = true;

        const { data, errors } = await this.checkoutNetworkManager.setCartItem(
          checkout
        );
        if (errors) {
          this.errors = this.errors.concat(errors);
        } else if (data) {
          this.repository.setCheckout(data);
        }

        this.loading.addItemToCart = false;
      }
    });
  }
}
