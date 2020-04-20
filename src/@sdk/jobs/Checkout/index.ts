import { DataErrorCheckoutTypes, ICreditCard } from "@sdk/api/Checkout/types";
import { CheckoutNetworkManager } from "@sdk/network";
import { ApolloErrorWithUserInput } from "@sdk/react/types";
import { ICheckoutAddress, LocalRepository } from "@sdk/repository";

import { JobQueue } from "../JobQueue";
import { PromiseCheckoutJobRunResponse } from "../types";

export class CheckoutJobQueue extends JobQueue {
  private checkoutNetworkManager: CheckoutNetworkManager;
  private onErrorListener?: (
    error: ApolloErrorWithUserInput | any,
    type: DataErrorCheckoutTypes
  ) => any;

  constructor(
    repository: LocalRepository,
    checkoutNetworkManager: CheckoutNetworkManager,
    onErrorListener: (
      error: ApolloErrorWithUserInput | any,
      type: DataErrorCheckoutTypes
    ) => any
  ) {
    super(repository);
    this.checkoutNetworkManager = checkoutNetworkManager;
    this.onErrorListener = onErrorListener;

    const queuePossibilities = new Map();
    this.enqueueAllSavedInRepository(queuePossibilities, "checkout");
  }

  runCreateCheckout = async (
    email: string,
    lines: Array<{ variantId: string; quantity: number }>,
    shippingAddress: ICheckoutAddress,
    selectedShippingAddressId?: string
  ): PromiseCheckoutJobRunResponse => {
    return this.createCheckout(
      email,
      lines,
      shippingAddress,
      selectedShippingAddressId
    );
  };

  runSetShippingAddress = async (
    checkoutId: string,
    shippingAddress: ICheckoutAddress,
    email: string,
    selectedShippingAddressId?: string
  ): PromiseCheckoutJobRunResponse => {
    return this.setShippingAddress(
      checkoutId,
      shippingAddress,
      email,
      selectedShippingAddressId
    );
  };

  runSetBillingAddress = async (
    checkoutId: string,
    billingAddress: ICheckoutAddress,
    billingAsShipping?: boolean,
    selectedBillingAddressId?: string
  ): PromiseCheckoutJobRunResponse => {
    return this.setBillingAddress(
      checkoutId,
      billingAddress,
      billingAsShipping,
      selectedBillingAddressId
    );
  };

  runSetShippingMethod = async (
    checkoutId: string,
    shippingMethodId: string
  ): PromiseCheckoutJobRunResponse => {
    return this.setShippingMethod(checkoutId, shippingMethodId);
  };

  runAddPromoCode = async (
    checkoutId: string,
    promoCode: string
  ): PromiseCheckoutJobRunResponse => {
    return this.addPromoCode(checkoutId, promoCode);
  };

  runRemovePromoCode = async (
    checkoutId: string,
    promoCode: string
  ): PromiseCheckoutJobRunResponse => {
    return this.removePromoCode(checkoutId, promoCode);
  };

  runCreatePayment = async (
    checkoutId: string,
    amount: number,
    paymentGateway: string,
    paymentToken: string,
    billingAddress: ICheckoutAddress,
    creditCard?: ICreditCard
  ): PromiseCheckoutJobRunResponse => {
    return this.createPayment(
      checkoutId,
      amount,
      paymentGateway,
      paymentToken,
      billingAddress,
      creditCard
    );
  };

  runCompleteCheckout = async (
    checkoutId: string
  ): PromiseCheckoutJobRunResponse => {
    return this.completeCheckout(checkoutId);
  };

  private createCheckout = async (
    email: string,
    lines: Array<{ variantId: string; quantity: number }>,
    shippingAddress: ICheckoutAddress,
    selectedShippingAddressId?: string
  ): PromiseCheckoutJobRunResponse => {
    const { data, error } = await this.checkoutNetworkManager.createCheckout(
      email,
      lines,
      shippingAddress
    );

    if (error) {
      /**
       * TODO: Differentiate errors!!! THIS IS A BUG!!!
       * DataErrorCheckoutTypes.SET_SHIPPING_ADDRESS is just one of every possible - instead of deprecated errors, checkoutErrors should be used.
       */
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.SET_SHIPPING_ADDRESS,
        },
      };
    } else {
      this.repository.setCheckout({
        ...data,
        selectedShippingAddressId,
      });
      return {
        data,
      };
    }
  };

  private setShippingAddress = async (
    checkoutId: string,
    shippingAddress: ICheckoutAddress,
    email: string,
    selectedShippingAddressId?: string
  ): PromiseCheckoutJobRunResponse => {
    const checkout = this.repository.getCheckout();

    const {
      data,
      error,
    } = await this.checkoutNetworkManager.setShippingAddress(
      shippingAddress,
      email,
      checkoutId
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.SET_SHIPPING_ADDRESS,
        },
      };
    } else {
      this.repository.setCheckout({
        ...checkout,
        billingAsShipping: false,
        email: data?.email,
        selectedShippingAddressId,
        shippingAddress: data?.shippingAddress,
      });
      return { data };
    }
  };

  private setBillingAddress = async (
    checkoutId: string,
    billingAddress: ICheckoutAddress,
    billingAsShipping?: boolean,
    selectedBillingAddressId?: string
  ): PromiseCheckoutJobRunResponse => {
    const checkout = this.repository.getCheckout();

    const { data, error } = await this.checkoutNetworkManager.setBillingAddress(
      billingAddress,
      checkoutId
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.SET_BILLING_ADDRESS,
        },
      };
    } else {
      this.repository.setCheckout({
        ...checkout,
        billingAddress: data?.billingAddress,
        billingAsShipping: !!billingAsShipping,
        selectedBillingAddressId,
      });
      return { data };
    }
  };

  private setShippingMethod = async (
    checkoutId: string,
    shippingMethodId: string
  ): PromiseCheckoutJobRunResponse => {
    const checkout = this.repository.getCheckout();

    const { data, error } = await this.checkoutNetworkManager.setShippingMethod(
      shippingMethodId,
      checkoutId
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.SET_SHIPPING_METHOD,
        },
      };
    } else {
      this.repository.setCheckout({
        ...checkout,
        promoCodeDiscount: data?.promoCodeDiscount,
        shippingMethod: data?.shippingMethod,
      });
      return { data };
    }
  };

  private addPromoCode = async (
    checkoutId: string,
    promoCode: string
  ): PromiseCheckoutJobRunResponse => {
    const checkout = this.repository.getCheckout();

    const { data, error } = await this.checkoutNetworkManager.addPromoCode(
      promoCode,
      checkoutId
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.ADD_PROMO_CODE,
        },
      };
    } else {
      this.repository.setCheckout({
        ...checkout,
        promoCodeDiscount: data?.promoCodeDiscount,
      });
      return { data };
    }
  };

  private removePromoCode = async (
    checkoutId: string,
    promoCode: string
  ): PromiseCheckoutJobRunResponse => {
    const checkout = this.repository.getCheckout();

    const { data, error } = await this.checkoutNetworkManager.removePromoCode(
      promoCode,
      checkoutId
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.REMOVE_PROMO_CODE,
        },
      };
    } else {
      this.repository.setCheckout({
        ...checkout,
        promoCodeDiscount: data?.promoCodeDiscount,
      });
      return { data };
    }
  };

  private createPayment = async (
    checkoutId: string,
    amount: number,
    paymentGateway: string,
    paymentToken: string,
    billingAddress: ICheckoutAddress,
    creditCard?: ICreditCard
  ): PromiseCheckoutJobRunResponse => {
    const payment = this.repository.getPayment();

    const { data, error } = await this.checkoutNetworkManager.createPayment(
      amount,
      checkoutId,
      paymentGateway,
      paymentToken,
      billingAddress
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.CREATE_PAYMENT,
        },
      };
    } else {
      this.repository.setPayment({
        ...payment,
        creditCard,
        gateway: data?.gateway,
        id: data?.id,
        token: data?.token,
      });
      return { data };
    }
  };

  private completeCheckout = async (
    checkoutId: string
  ): PromiseCheckoutJobRunResponse => {
    const { data, error } = await this.checkoutNetworkManager.completeCheckout(
      checkoutId
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.COMPLETE_CHECKOUT,
        },
      };
    } else {
      // this.repository.setOrder(data);
      this.repository.setCheckout({});
      this.repository.setPayment({});
      return { data };
    }
  };
}
