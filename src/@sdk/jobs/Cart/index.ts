import { CheckoutNetworkManager } from "@sdk/network";
import { ApolloErrorWithUserInput } from "@sdk/react/types";
import { LocalRepository } from "@sdk/repository";

import { JobQueue } from "../JobQueue";
import { LocalStorageJobs } from "../types";

export enum ErrorCartTypes {
  "SET_CART_ITEM",
}

export class CartJobQueue extends JobQueue {
  private checkoutNetworkManager: CheckoutNetworkManager;
  private onErrorListener?: (
    error: ApolloErrorWithUserInput | any,
    type: ErrorCartTypes
  ) => any;

  constructor(
    repository: LocalRepository,
    checkoutNetworkManager: CheckoutNetworkManager,
    onErrorListener: (
      error: ApolloErrorWithUserInput | any,
      type: ErrorCartTypes
    ) => any
  ) {
    super(repository);
    this.repository = repository;
    this.checkoutNetworkManager = checkoutNetworkManager;
    this.onErrorListener = onErrorListener;

    const queuePossibilities = new Map([
      ["setCartItem", this.enqueueSetCartItem],
    ]);
    this.enqueueAllSavedInRepository(queuePossibilities, "cart");
  }

  enqueueSetCartItem = () => {
    this.addToQueue(
      LocalStorageJobs.CHECKOUT_SET_CART_ITEM,
      () => this.setCartItem(),
      () => {
        this.updateJobsStateInRepository(
          {
            setCartItem: true,
          },
          "cart"
        );
      },
      () => {
        this.updateJobsStateInRepository(
          {
            setCartItem: false,
          },
          "cart"
        );
      }
    );
  };

  private setCartItem = async () => {
    const checkout = this.repository.getCheckout();

    if (checkout) {
      const { data, error } = await this.checkoutNetworkManager.setCartItem(
        checkout
      );
      if (error && this.onErrorListener) {
        this.onErrorListener(error, ErrorCartTypes.SET_CART_ITEM);
      } else if (data) {
        this.repository.setCheckout({
          ...checkout,
          lines: data.lines,
        });
      }
    }
  };
}
