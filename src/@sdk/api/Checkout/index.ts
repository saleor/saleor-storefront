import { ErrorListener } from "@sdk/helpers";
import { CheckoutJobQueue } from "@sdk/jobs";
import { CheckoutNetworkManager } from "@sdk/network";
import { CheckoutRepositoryManager, ICheckoutModel } from "@sdk/repository";
import { SaleorState } from "@sdk/state";
import { StateItems } from "@sdk/state/types";

import {
  IAddress,
  IAvailableShippingMethods,
  ICheckout,
  ISaleorCheckoutAPI,
} from "./types";

export class SaleorCheckoutAPI extends ErrorListener
  implements ISaleorCheckoutAPI {
  checkout?: ICheckout;
  promoCode?: string;
  billingAsShipping?: boolean;
  selectedShippingAddressId?: string;
  availableShippingMethods?: IAvailableShippingMethods;

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
      ({
        id,
        email,
        shippingAddress,
        billingAddress,
        availableShippingMethods,
      }: ICheckoutModel) => {
        this.checkout = {
          billingAddress,
          email,
          id,
          shippingAddress,
        };
        this.availableShippingMethods = availableShippingMethods;
      }
    );
    this.saleorState.subscribeToChange(
      StateItems.SELECTED_SHIPPING_ADDRESS_ID,
      (selectedShippingAddressId?: string) => {
        this.selectedShippingAddressId = selectedShippingAddressId;
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
  setBillingAddress = async (billingAddress: IAddress) =>
    Promise.resolve({
      pending: false,
    });

  setShippingAddress = async (shippingAddress: IAddress, email: string) => {
    await this.saleorState.provideCheckout(this.fireError);

    // 1. save in local storage
    this.checkoutRepositoryManager.setShippingAddress(shippingAddress, email);
    this.saleorState.updateSelectedShippingAddressId(shippingAddress.id);

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
  setBillingAsShippingAddress = (billingAsShipping: boolean) =>
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
