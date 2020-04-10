import { ErrorListener } from "@sdk/helpers";
import { CheckoutJobQueue } from "@sdk/jobs";
import { CheckoutNetworkManager } from "@sdk/network";
import {
  CheckoutRepositoryManager,
  ICheckoutModel,
  IPaymentModel,
} from "@sdk/repository";
import { SaleorState } from "@sdk/state";
import { StateItems } from "@sdk/state/types";

import {
  IAddress,
  IAvailablePaymentGateways,
  IAvailableShippingMethods,
  ICheckout,
  IPayment,
  IPromoCodeDiscount,
  ISaleorCheckoutAPI,
} from "./types";

export class SaleorCheckoutAPI extends ErrorListener
  implements ISaleorCheckoutAPI {
  loaded: boolean;
  checkout?: ICheckout;
  promoCodeDiscount?: IPromoCodeDiscount;
  billingAsShipping?: boolean;
  selectedShippingAddressId?: string;
  selectedBillingAddressId?: string;
  availableShippingMethods?: IAvailableShippingMethods;
  selectedShippingMethodId?: string;
  availablePaymentGateways?: IAvailablePaymentGateways;
  payment?: IPayment;

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
    this.loaded = false;

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
        shippingMethod,
        availablePaymentGateways,
        promoCodeDiscount,
      }: ICheckoutModel) => {
        this.checkout = {
          billingAddress,
          email,
          id,
          shippingAddress,
          shippingMethod,
          token,
        };
        this.availableShippingMethods = availableShippingMethods;
        this.availablePaymentGateways = availablePaymentGateways;
        this.billingAsShipping = billingAsShipping;
        this.promoCodeDiscount = {
          discountName: promoCodeDiscount?.discountName,
          voucherCode: promoCodeDiscount?.voucherCode,
        };
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
    this.saleorState.subscribeToChange(
      StateItems.PAYMENT,
      ({ id, token, gateway, creditCard }: IPaymentModel) => {
        this.payment = {
          creditCard,
          gateway,
          id,
          token,
        };
      }
    );

    if (loadOnStart) {
      this.load();
    }
  }

  load = async () => {
    await this.saleorState.provideCheckout(this.fireError, true);
    await this.saleorState.providePayment(true);
    this.loaded = true;
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

  setShippingMethod = async (shippingMethodId: string) => {
    await this.saleorState.provideCheckout(this.fireError);

    // 1. save in local storage
    if (this.checkout?.id) {
      this.checkoutRepositoryManager.setShippingMethod(shippingMethodId);
    }

    // 2. save online if possible (if checkout id available)
    if (this.saleorState.checkout?.id) {
      this.checkoutJobQueue.enqueueSetShippingMethod();
      return {
        pending: true,
      };
    }
    return {
      pending: false,
    };
  };

  addPromoCode = async (promoCode: string) => {
    await this.saleorState.provideCheckout(this.fireError);

    if (this.saleorState.checkout?.id) {
      this.checkoutJobQueue.runAddPromoCode(promoCode);
      return {
        pending: false,
      };
    }
    return {
      pending: false,
    };
  };

  removePromoCode = async (promoCode: string) => {
    await this.saleorState.provideCheckout(this.fireError);

    if (this.saleorState.checkout?.id) {
      this.checkoutJobQueue.runRemovePromoCode(promoCode);
      return {
        pending: false,
      };
    }
    return {
      pending: false,
    };
  };

  createPayment = async (gateway: string, token: string) => {
    await this.saleorState.provideCheckout(this.fireError);
    await this.saleorState.providePayment();

    // 1. save in local storage
    this.checkoutRepositoryManager.setPaymentGatewayData(gateway, token);

    // 2. save online if possible (if checkout id available)
    if (
      this.saleorState.checkout?.id &&
      this.saleorState.summaryPrices?.totalPrice &&
      gateway &&
      token
    ) {
      this.checkoutJobQueue.runCreatePayment(
        this.saleorState.summaryPrices?.totalPrice.gross.amount
      );
      return {
        pending: false,
      };
    }
    return {
      pending: false,
    };
  };

  completeCheckout = async () => {
    await this.saleorState.provideCheckout(this.fireError);

    if (this.saleorState.checkout?.id) {
      const data = await this.checkoutJobQueue.runCompleteCheckout();
      return {
        data,
        pending: false,
      };
    }
    return {
      pending: false,
    };
  };
}
