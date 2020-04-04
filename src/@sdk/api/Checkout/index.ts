import { ErrorListener } from "@sdk/helpers";
import { CheckoutJobQueue } from "@sdk/jobs";
import { CheckoutNetworkManager } from "@sdk/network";
import { CheckoutRepositoryManager, ICheckoutModel } from "@sdk/repository";
import { SaleorState } from "@sdk/state";
import { StateItems } from "@sdk/state/types";

import {
  IAddress,
  IAvailablePaymentGateways,
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
  selectedBillingAddressId?: string;
  availableShippingMethods?: IAvailableShippingMethods;
  availablePaymentGateways?: IAvailablePaymentGateways;

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
        token,
        email,
        shippingAddress,
        billingAddress,
        billingAsShipping,
        availableShippingMethods,
        availablePaymentGateways,
      }: ICheckoutModel) => {
        this.checkout = {
          billingAddress,
          email,
          id,
          shippingAddress,
          token,
        };
        this.availableShippingMethods = availableShippingMethods;
        this.availablePaymentGateways = availablePaymentGateways;
        this.billingAsShipping = billingAsShipping;
      }
    );
    this.saleorState.subscribeToChange(
      StateItems.SELECTED_SHIPPING_ADDRESS_ID,
      (selectedShippingAddressId?: string) => {
        this.selectedShippingAddressId = selectedShippingAddressId;
      }
    );
    this.saleorState.subscribeToChange(
      StateItems.SELECTED_BILLING_ADDRESS_ID,
      (selectedBillingAddressId?: string) => {
        this.selectedBillingAddressId = selectedBillingAddressId;
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

  setBillingAddress = async (billingAddress: IAddress) => {
    await this.saleorState.provideCheckout(this.fireError);

    // 1. save in local storage
    this.checkoutRepositoryManager.setBillingAddress(billingAddress);
    this.saleorState.updateSelectedBillingAddressId(billingAddress.id);

    // 2. save online if possible (if checkout id available)
    if (this.saleorState.checkout?.id) {
      this.checkoutJobQueue.enqueueSetBillingAddress();
      return {
        pending: true,
      };
    }
    return {
      pending: false,
    };
  };

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

  setBillingAsShippingAddress = async (billingAsShipping: boolean) => {
    await this.saleorState.provideCheckout(this.fireError);

    // 1. save in local storage
    if (this.checkout?.shippingAddress) {
      this.checkoutRepositoryManager.setBillingAddress(
        this.checkout?.shippingAddress,
        billingAsShipping
      );
      this.saleorState.updateSelectedBillingAddressId(
        this.checkout?.shippingAddress.id
      );
    }

    // 2. save online if possible (if checkout id available)
    if (this.saleorState.checkout?.id) {
      this.checkoutJobQueue.enqueueSetBillingAddress();
      return {
        pending: true,
      };
    }
    return {
      pending: false,
    };
  };

  createPayment = async (gateway: string, token: string) => {
    await this.saleorState.provideCheckout(this.fireError);

    // 1. save in local storage
    this.checkoutRepositoryManager.setPaymentGatewayData(gateway, token);

    // 2. save online if possible (if checkout id available)
    if (this.saleorState.checkout?.id && gateway && token) {
      this.checkoutJobQueue.runCreatePayment();
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
  makeOrder = () =>
    Promise.resolve({
      pending: false,
    });
}
