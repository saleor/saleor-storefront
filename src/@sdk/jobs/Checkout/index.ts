import { CheckoutNetworkManager } from "@sdk/network";
import { ApolloErrorWithUserInput } from "@sdk/react/types";
import { LocalRepository } from "@sdk/repository";

import { JobQueue } from "../JobQueue";
import { LocalStorageJobs } from "../types";

export class CheckoutJobQueue extends JobQueue {
  private checkoutNetworkManager: CheckoutNetworkManager;
  private onErrorListener:
    | ((error: ApolloErrorWithUserInput | any) => any)
    | undefined;

  constructor(
    repository: LocalRepository,
    checkoutNetworkManager: CheckoutNetworkManager,
    onErrorListener: (error: ApolloErrorWithUserInput | any) => any
  ) {
    super(repository);
    this.checkoutNetworkManager = checkoutNetworkManager;
    this.onErrorListener = onErrorListener;

    const queuePossibilities = new Map([
      ["setShippingAddress", this.enqueueSetShippingAddress],
      ["setBillingAddress", this.enqueueSetBillingAddress],
      ["setShippingMethod", this.enqueueSetShippingMethod],
    ]);
    this.enqueueAllSavedInRepository(queuePossibilities, "checkout");
  }

  enqueueSetShippingAddress = () => {
    this.addToQueue(
      LocalStorageJobs.CHECKOUT_SET_SHIPPING_ADDRESS,
      () => this.setShippingAddress(),
      () => {
        this.updateJobsStateInRepository(
          {
            setShippingAddress: true,
          },
          "checkout"
        );
      },
      () => {
        this.updateJobsStateInRepository(
          {
            setShippingAddress: false,
          },
          "checkout"
        );
      }
    );
  };

  enqueueSetBillingAddress = () => {
    this.addToQueue(
      LocalStorageJobs.CHECKOUT_SET_BILLING_ADDRESS,
      () => this.setBillingAddress(),
      () => {
        this.updateJobsStateInRepository(
          {
            setBillingAddress: true,
          },
          "checkout"
        );
      },
      () => {
        this.updateJobsStateInRepository(
          {
            setBillingAddress: false,
          },
          "checkout"
        );
      }
    );
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

  runSetPromoCode = (promoCode: string) => {
    this.setPromoCode(promoCode);
  };

  runCreatePayment = (amount: number) => {
    this.createPayment(amount);
  };

  runCompleteCheckout = async () => {
    return this.completeCheckout();
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
        this.repository.setCheckout({
          ...checkout,
          email: data.email,
          shippingAddress: data.shippingAddress,
        });
      }
    }
  };

  private setBillingAddress = async () => {
    const checkout = this.repository.getCheckout();

    if (checkout) {
      const {
        data,
        errors,
      } = await this.checkoutNetworkManager.setBillingAddress(checkout);
      if (errors && this.onErrorListener) {
        this.onErrorListener(errors);
      } else if (data) {
        this.repository.setCheckout({
          ...checkout,
          billingAddress: data.billingAddress,
        });
      }
    }
  };

  private setShippingMethod = async () => {
    const checkout = this.repository.getCheckout();

    if (checkout) {
      const {
        data,
        errors,
      } = await this.checkoutNetworkManager.setShippingMethod(checkout);
      if (errors && this.onErrorListener) {
        this.onErrorListener(errors);
      } else if (data) {
        this.repository.setCheckout({
          ...checkout,
          shippingMethod: data.shippingMethod,
        });
      }
    }
  };

  private setPromoCode = async (promoCode: string) => {
    const checkout = this.repository.getCheckout();

    if (checkout) {
      const { data, errors } = await this.checkoutNetworkManager.setPromoCode(
        promoCode,
        checkout
      );
      if (errors && this.onErrorListener) {
        this.onErrorListener(errors);
      } else if (data) {
        this.repository.setCheckout({
          ...checkout,
          promoCodeDiscount: checkout.promoCodeDiscount,
        });
      }
    }
  };

  private createPayment = async (amount: number) => {
    const checkout = this.repository.getCheckout();
    const payment = this.repository.getPayment();

    if (checkout && payment) {
      const { data, errors } = await this.checkoutNetworkManager.createPayment(
        amount,
        checkout,
        payment
      );
      if (errors && this.onErrorListener) {
        this.onErrorListener(errors);
      } else if (data) {
        this.repository.setPayment(data);
      }
    }
  };

  private completeCheckout = async () => {
    const checkout = this.repository.getCheckout();

    if (checkout) {
      const {
        data,
        errors,
      } = await this.checkoutNetworkManager.completeCheckout(checkout);
      if (errors && this.onErrorListener) {
        this.onErrorListener(errors);
      } else if (data) {
        // this.repository.setOrder(data);
        this.repository.setCheckout({});
        this.repository.setPayment({});
        return data;
      }
    }
  };
}
