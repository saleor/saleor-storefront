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

    const queuePossibilities = new Map([
      ["setCartItem", this.enqueueSetCartItem],
    ]);
    this.enqueueAllSavedInRepository(queuePossibilities);
  }

  enqueueSetCartItem(
    onLoading?: (loading: boolean) => any,
    onError?: (error: any) => any
  ) {
    this.addToQueue(
      LocalStorageJobs.CHECKOUT_SET_CART_ITEM,
      () => this.setCartItem(onLoading, onError),
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

  private setCartItem = async (
    onLoading?: (loading: boolean) => any,
    onError?: (error: any) => any
  ) => {
    const checkout = this.repository.getCheckout();

    if (checkout) {
      if (onLoading) {
        onLoading(true);
      }

      const { data, errors } = await this.checkoutNetworkManager.setCartItem(
        checkout
      );
      if (errors && onError) {
        onError(errors);
      } else if (data) {
        this.repository.setCheckout(data);
      }

      if (onLoading) {
        onLoading(false);
      }
    }
  };

  private enqueueAllSavedInRepository(
    queuePossibilities: Map<string, () => any>
  ) {
    const jobs = this.repository.getJobs();

    if (jobs) {
      const checkout = jobs.checkout;
      const checkoutJobsNames = Object.keys(checkout) as Array<
        keyof typeof checkout
      >;

      checkoutJobsNames
        .filter(name => checkout[name])
        .forEach(name => queuePossibilities.get(name));
    }
  }
}
