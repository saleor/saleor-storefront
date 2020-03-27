import { CheckoutNetworkManager } from "@sdk/network";
import { ApolloErrorWithUserInput } from "@sdk/react/types";
import { LocalRepository } from "@sdk/repository";

import { JobQueue } from "../JobQueue";
import { LocalStorageJobs } from "../types";

export class CartJobQueue extends JobQueue {
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
      ["setCartItem", this.enqueueSetCartItem],
    ]);
    this.enqueueAllSavedInRepository(
      queuePossibilities,
      this.repository,
      "cart"
    );
  }

  enqueueSetCartItem = () => {
    this.addToQueue(
      LocalStorageJobs.CHECKOUT_SET_CART_ITEM,
      () => this.setCartItem(),
      () => {
        const jobs = this.repository.getJobs();

        this.repository.setJobs({
          ...jobs,
          cart: jobs?.cart
            ? jobs.cart
            : {
                setCartItem: false,
              },
          checkout: {
            ...jobs?.checkout,
            setShippingAddress: true,
          },
        });
      },
      () => {
        const jobs = this.repository.getJobs();

        this.repository.setJobs({
          ...jobs,
          cart: jobs?.cart
            ? jobs.cart
            : {
                setCartItem: false,
              },
          checkout: {
            ...jobs?.checkout,
            setShippingAddress: false,
          },
        });
      }
    );
  };

  private setCartItem = async () => {
    const checkout = this.repository.getCheckout();

    if (checkout) {
      const { data, errors } = await this.checkoutNetworkManager.setCartItem(
        checkout
      );
      if (errors && this.onErrorListener) {
        this.onErrorListener(errors);
      } else if (data) {
        this.repository.setCheckout(data);
      }
    }
  };
}
