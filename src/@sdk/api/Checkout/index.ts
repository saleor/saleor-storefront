import { ErrorListener } from "@sdk/helpers";
import { CheckoutJobQueue } from "@sdk/jobs";
import { CheckoutNetworkManager } from "@sdk/network";
import { CheckoutRepositoryManager, ICheckoutModel } from "@sdk/repository";
import { SaleorState } from "@sdk/state";
import { StateItems } from "@sdk/state/types";

import { IAddress, ICheckout, ISaleorCheckoutAPI } from "./types";

export class SaleorCheckoutAPI extends ErrorListener
  implements ISaleorCheckoutAPI {
  checkout: ICheckout | null;
  promoCode: string | null;
  shippingAsBilling: boolean;

  private checkoutRepositoryManager: CheckoutRepositoryManager;
  private saleorState: SaleorState;
  private checkoutNetworkManager: CheckoutNetworkManager;
  private checkoutJobQueue: CheckoutJobQueue;

  constructor(
    checkoutRepositoryManager: CheckoutRepositoryManager,
    checkoutNetworkManager: CheckoutNetworkManager,
    saleorState: SaleorState,
    loadOnStart: boolean
  ) {
    super();
    this.checkout = null;
    this.promoCode = null;
    this.shippingAsBilling = false;

    this.saleorState = saleorState;
    this.checkoutRepositoryManager = checkoutRepositoryManager;
    this.checkoutNetworkManager = checkoutNetworkManager;
    this.checkoutJobQueue = new CheckoutJobQueue(
      this.checkoutRepositoryManager.getRepository(),
      this.checkoutNetworkManager,
      this.fireError
    );

    this.saleorState.subscribeToChange(
      StateItems.CHECKOUT,
      ({ id, email, shippingAddress, billingAddress }: ICheckoutModel) => {
        this.checkout = {
          billingAddress,
          email,
          id,
          shippingAddress,
        };
      }
    );

    if (loadOnStart) {
      this.load();
    }
  }

  load = async () => {
    await this.saleorState.provideCheckout(this.fireError, true);
    return {
      pending: false,
    };
  };

  /**
   * Method not implemented yet
   */
  setBillingAddress = () =>
    Promise.resolve({
      pending: false,
    });

  setShippingAddress = async (shippingAddress: IAddress) => {
    await this.saleorState.provideCheckout(this.fireError);

    // 1. save in local storage
    this.checkoutRepositoryManager.setShippingAddress(
      this.saleorState.checkout,
      shippingAddress
    );

    // 2. save online if possible (if checkout id available)
    if (this.saleorState.checkout?.id) {
      this.checkoutJobQueue.enqueueSetShippingAddress();
      return {
        pending: true,
      };
    }
    return {
      pending: false,
    };
  };

  /**
   * Method not implemented yet
   */
  setShippingAsBillingAddress = () =>
    Promise.resolve({
      pending: false,
    });

  /**
   * Method not implemented yet
   */
  makeOrder = () =>
    Promise.resolve({
      pending: false,
    });
}
