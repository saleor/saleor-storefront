import { CheckoutNetworkManager } from "@sdk/network";
import { ApolloErrorWithUserInput } from "@sdk/react/types";
import { LocalRepository } from "@sdk/repository";

import { JobQueue } from "../JobQueue";
import { LocalStorageJobs } from "../types";

export enum ErrorCheckoutTypes {
  "SET_SHIPPING_ADDRESS",
  "SET_BILLING_ADDRESS",
  "SET_SHIPPING_METHOD",
  "ADD_PROMO_CODE",
  "REMOVE_PROMO_CODE",
  "CREATE_PAYMENT",
  "COMPLETE_CHECKOUT",
  "GET_CHECKOUT",
}

export class CheckoutJobQueue extends JobQueue {
  private checkoutNetworkManager: CheckoutNetworkManager;
  private onErrorListener?: (
    error: ApolloErrorWithUserInput | any,
    type: ErrorCheckoutTypes
  ) => any;

  constructor(
    repository: LocalRepository,
    checkoutNetworkManager: CheckoutNetworkManager,
    onErrorListener: (
      error: ApolloErrorWithUserInput | any,
      type: ErrorCheckoutTypes
    ) => any
  ) {
    super(repository);
    this.checkoutNetworkManager = checkoutNetworkManager;
    this.onErrorListener = onErrorListener;

    const queuePossibilities = new Map([
      ["setShippingMethod", this.enqueueSetShippingMethod],
    ]);
    this.enqueueAllSavedInRepository(queuePossibilities, "checkout");
  }

  runSetShippingAddress = async () => {
    return this.setShippingAddress();
  };

  runSetBillingAddress = async () => {
    return this.setBillingAddress();
  };

  enqueueSetShippingMethod = () => {
    this.addToQueue(
      LocalStorageJobs.CHECKOUT_SET_SHIPPING_METHOD,
      () => this.setShippingMethod(),
      () => {
        this.updateJobsStateInRepository(
          {
            setShippingMethod: true,
          },
          "checkout"
        );
      },
      () => {
        this.updateJobsStateInRepository(
          {
            setShippingMethod: false,
          },
          "checkout"
        );
      }
    );
  };

  runAddPromoCode = async (promoCode: string) => {
    return this.addPromoCode(promoCode);
  };

  runRemovePromoCode = async (promoCode: string) => {
    return this.removePromoCode(promoCode);
  };

  runCreatePayment = async (amount: number) => {
    return this.createPayment(amount);
  };

  runCompleteCheckout = async () => {
    return this.completeCheckout();
  };

  private setShippingAddress = async () => {
    const checkout = this.repository.getCheckout();

    if (checkout) {
      const {
        data,
        error,
      } = await this.checkoutNetworkManager.setShippingAddress(checkout);
      if (error && this.onErrorListener) {
        this.onErrorListener(error, ErrorCheckoutTypes.SET_SHIPPING_ADDRESS);
      } else if (data) {
        this.repository.setCheckout({
          ...checkout,
          email: data.email,
          shippingAddress: data.shippingAddress,
        });
        return data;
      }
    }
  };

  private setBillingAddress = async () => {
    const checkout = this.repository.getCheckout();

    if (checkout) {
      const {
        data,
        error,
      } = await this.checkoutNetworkManager.setBillingAddress(checkout);
      if (error && this.onErrorListener) {
        this.onErrorListener(error, ErrorCheckoutTypes.SET_BILLING_ADDRESS);
      } else if (data) {
        this.repository.setCheckout({
          ...checkout,
          billingAddress: data.billingAddress,
        });
        return data;
      }
    }
  };

  private setShippingMethod = async () => {
    const checkout = this.repository.getCheckout();

    if (checkout) {
      const {
        data,
        error,
      } = await this.checkoutNetworkManager.setShippingMethod(checkout);
      if (error && this.onErrorListener) {
        this.onErrorListener(error, ErrorCheckoutTypes.SET_SHIPPING_METHOD);
      } else if (data) {
        this.repository.setCheckout({
          ...checkout,
          shippingMethod: data.shippingMethod,
        });
        return data;
      }
    }
  };

  private addPromoCode = async (promoCode: string) => {
    const checkout = this.repository.getCheckout();

    if (checkout) {
      const { data, error } = await this.checkoutNetworkManager.addPromoCode(
        promoCode,
        checkout
      );
      if (error && this.onErrorListener) {
        this.onErrorListener(error, ErrorCheckoutTypes.ADD_PROMO_CODE);
      } else if (data) {
        this.repository.setCheckout({
          ...checkout,
          promoCodeDiscount: data.promoCodeDiscount,
        });
        return data;
      }
    }
  };

  private removePromoCode = async (promoCode: string) => {
    const checkout = this.repository.getCheckout();

    if (checkout) {
      const { data, error } = await this.checkoutNetworkManager.removePromoCode(
        promoCode,
        checkout
      );
      if (error && this.onErrorListener) {
        this.onErrorListener(error, ErrorCheckoutTypes.REMOVE_PROMO_CODE);
      } else if (data) {
        this.repository.setCheckout({
          ...checkout,
          promoCodeDiscount: data.promoCodeDiscount,
        });
        return data;
      }
    }
  };

  private createPayment = async (amount: number) => {
    const checkout = this.repository.getCheckout();
    const payment = this.repository.getPayment();

    if (checkout && payment) {
      const { data, error } = await this.checkoutNetworkManager.createPayment(
        amount,
        checkout,
        payment
      );
      if (error && this.onErrorListener) {
        this.onErrorListener(error, ErrorCheckoutTypes.CREATE_PAYMENT);
      } else if (data) {
        this.repository.setPayment({
          ...payment,
          gateway: data.gateway,
          id: data.id,
          token: data.token,
        });
        return data;
      }
    }
  };

  private completeCheckout = async () => {
    const checkout = this.repository.getCheckout();

    if (checkout) {
      const {
        data,
        error,
      } = await this.checkoutNetworkManager.completeCheckout(checkout);
      if (error && this.onErrorListener) {
        this.onErrorListener(error, ErrorCheckoutTypes.COMPLETE_CHECKOUT);
      } else if (data) {
        // this.repository.setOrder(data);
        this.repository.setCheckout({});
        this.repository.setPayment({});
        return data;
      }
    }
  };
}
