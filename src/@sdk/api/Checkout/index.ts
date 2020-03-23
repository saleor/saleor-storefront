import { ErrorListener } from "@sdk/helpers";
import { CheckoutNetworkManager } from "@sdk/network";
import { CheckoutRepositoryManager, ICheckoutModel } from "@sdk/repository";
import { SaleorState } from "@sdk/state";
import { StateItems } from "@sdk/state/types";

import { ICheckout, ISaleorCheckoutAPI } from "./types";

export class SaleorCheckoutAPI extends ErrorListener
  implements ISaleorCheckoutAPI {
  checkout: ICheckout | null;
  promoCode: string | null;
  shippingAsBilling: boolean;

  private checkoutRepositoryManager: CheckoutRepositoryManager;
  private saleorState: SaleorState;
  private checkoutNetworkManager: CheckoutNetworkManager;

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

  /**
   * Method not implemented yet
   */
  setShippingAddress = () =>
    Promise.resolve({
      pending: false,
    });

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
