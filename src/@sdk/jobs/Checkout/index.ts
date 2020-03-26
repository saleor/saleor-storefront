import { CheckoutNetworkManager } from "@sdk/network";
import { ApolloErrorWithUserInput } from "@sdk/react/types";
import { LocalRepository } from "@sdk/repository";

import { JobQueue } from "../JobQueue";
import { LocalStorageJobs } from "../types";

export class CheckoutJobQueue extends JobQueue {
  private repository: LocalRepository;
  private checkoutNetworkManager: CheckoutNetworkManager;
  private onErrorListener:
    | ((error: ApolloErrorWithUserInput | any) => any)
    | undefined;

  constructor(
    repository: LocalRepository,
    checkoutNetworkManager: CheckoutNetworkManager,
    onErrorListener: (error: ApolloErrorWithUserInput | any) => any
  ) {
    super();
    this.repository = repository;
    this.checkoutNetworkManager = checkoutNetworkManager;
    this.onErrorListener = onErrorListener;

    const queuePossibilities = new Map([
      ["setShippingAddress", this.enqueueSetShippingAddress],
    ]);
    this.enqueueAllSavedInRepository(queuePossibilities);
  }

  enqueueSetShippingAddress = () => {
    this.addToQueue(
      LocalStorageJobs.CHECKOUT_SET_SHIPPING_ADDRESS,
      () => this.setShippingAddress(),
      () => {
        const jobs = this.repository.getJobs();

        this.repository.setJobs({
          ...jobs,
          cart: {
            ...jobs?.checkout,
            setCartItem: true,
          },
          checkout: jobs?.checkout
            ? jobs.checkout
            : {
                setShippingAddress: false,
              },
        });
      },
      () => {
        const jobs = this.repository.getJobs();

        this.repository.setJobs({
          ...jobs,
          cart: {
            ...jobs?.checkout,
            setCartItem: false,
          },
          checkout: jobs?.checkout
            ? jobs.checkout
            : {
                setShippingAddress: false,
              },
        });
      }
    );
  };

  private setShippingAddress = async () => {
    const checkout = this.repository.getCheckout();

    if (checkout) {
      const {
        data,
        errors,
      } = await this.checkoutNetworkManager.setShippingAddress(checkout);
      if (errors && this.onErrorListener) {
        this.onErrorListener(errors);
      } else if (data) {
        this.repository.setCheckout(data);
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
        .forEach(name => {
          const queueFunc = queuePossibilities.get(name);
          if (queueFunc) {
            queueFunc();
          }
        });
    }
  }
}
