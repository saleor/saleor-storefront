import { CheckoutNetworkManager } from "@sdk/network";
import { LocalRepository } from "@sdk/repository";

import { JobQueue } from "../JobQueue";
import { LocalStorageJobs } from "../types";

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

    const jobs = this.repository.getJobs();
    if (jobs?.checkout.setCartItem) {
      this.enqueueSetCartItem();
    }
  }

  enqueueSetCartItem() {
    this.addToQueue(
      LocalStorageJobs.CHECKOUT_SET_CART_ITEM,
      this.setCartItem,
      () => {
        const jobs = this.repository.getJobs();

        this.repository.setJobs({
          ...jobs,
          checkout: {
            ...jobs?.checkout,
            setCartItem: true,
          },
        });
      },
      () => {
        const jobs = this.repository.getJobs();

        this.repository.setJobs({
          ...jobs,
          checkout: {
            ...jobs?.checkout,
            setCartItem: false,
          },
        });
      }
    );
  }

  private setCartItem = async () => {
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
  };
}
