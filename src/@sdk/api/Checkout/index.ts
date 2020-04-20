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

import { PromiseRunResponse } from "../types";
import {
  DataErrorCheckoutTypes,
  FunctionErrorCheckoutTypes,
  IAddress,
  IAvailablePaymentGateways,
  IAvailableShippingMethods,
  ICheckout,
  ICreditCard,
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
        selectedShippingAddressId,
        selectedBillingAddressId,
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
        this.selectedShippingAddressId = selectedShippingAddressId;
        this.selectedBillingAddressId = selectedBillingAddressId;
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

  setShippingAddress = async (
    shippingAddress: IAddress,
    email: string
  ): PromiseRunResponse<DataErrorCheckoutTypes, FunctionErrorCheckoutTypes> => {
    await this.saleorState.provideCheckout(this.fireError);
    const checkoutId = this.saleorState.checkout?.id;
    const alteredLines = this.saleorState.checkout?.lines?.map(item => ({
      quantity: item!.quantity,
      variantId: item?.variant!.id,
    }));

    if (alteredLines && checkoutId) {
      const {
        data,
        dataError,
      } = await this.checkoutJobQueue.runSetShippingAddress(
        checkoutId,
        shippingAddress,
        email,
        shippingAddress.id
      );

      return {
        data,
        dataError,
        pending: false,
      };
    } else if (alteredLines) {
      const { data, dataError } = await this.checkoutJobQueue.runCreateCheckout(
        email,
        alteredLines,
        shippingAddress,
        shippingAddress.id
      );

      return {
        data,
        dataError,
        pending: false,
      };
    } else {
      return {
        functionError: {
          error: new Error(
            "You need to add items to cart before setting shipping address."
          ),
          type: FunctionErrorCheckoutTypes.SHIPPING_ADDRESS_NOT_SET,
        },
        pending: false,
      };
    }
  };

  setBillingAddress = async (
    billingAddress: IAddress
  ): PromiseRunResponse<DataErrorCheckoutTypes, FunctionErrorCheckoutTypes> => {
    await this.saleorState.provideCheckout(this.fireError);
    const checkoutId = this.saleorState.checkout?.id;

    if (checkoutId && this.checkout?.shippingAddress) {
      const {
        data,
        dataError,
      } = await this.checkoutJobQueue.runSetBillingAddress(
        checkoutId,
        billingAddress,
        false,
        billingAddress.id
      );
      return {
        data,
        dataError,
        pending: false,
      };
    } else {
      return {
        functionError: {
          error: new Error(
            "You need to set shipping address before setting billing address."
          ),
          type: FunctionErrorCheckoutTypes.SHIPPING_ADDRESS_NOT_SET,
        },
        pending: false,
      };
    }
  };

  setBillingAsShippingAddress = async (): PromiseRunResponse<
    DataErrorCheckoutTypes,
    FunctionErrorCheckoutTypes
  > => {
    await this.saleorState.provideCheckout(this.fireError);
    const checkoutId = this.saleorState.checkout?.id;

    if (checkoutId && this.checkout?.shippingAddress) {
      const {
        data,
        dataError,
      } = await this.checkoutJobQueue.runSetBillingAddress(
        checkoutId,
        this.checkout.shippingAddress,
        true,
        this.checkout?.shippingAddress.id
      );
      return {
        data,
        dataError,
        pending: false,
      };
    } else {
      return {
        functionError: {
          error: new Error(
            "You need to set shipping address before setting billing address."
          ),
          type: FunctionErrorCheckoutTypes.SHIPPING_ADDRESS_NOT_SET,
        },
        pending: false,
      };
    }
  };

  setShippingMethod = async (
    shippingMethodId: string
  ): PromiseRunResponse<DataErrorCheckoutTypes, FunctionErrorCheckoutTypes> => {
    await this.saleorState.provideCheckout(this.fireError);
    const checkoutId = this.saleorState.checkout?.id;

    if (checkoutId) {
      const {
        data,
        dataError,
      } = await this.checkoutJobQueue.runSetShippingMethod(
        checkoutId,
        shippingMethodId
      );
      return {
        data,
        dataError,
        pending: false,
      };
    } else {
      return {
        functionError: {
          error: new Error(
            "You need to set shipping address before setting shipping method."
          ),
          type: FunctionErrorCheckoutTypes.SHIPPING_ADDRESS_NOT_SET,
        },
        pending: false,
      };
    }
  };

  addPromoCode = async (
    promoCode: string
  ): PromiseRunResponse<DataErrorCheckoutTypes, FunctionErrorCheckoutTypes> => {
    await this.saleorState.provideCheckout(this.fireError);
    const checkoutId = this.saleorState.checkout?.id;

    if (checkoutId) {
      const { data, dataError } = await this.checkoutJobQueue.runAddPromoCode(
        checkoutId,
        promoCode
      );
      return {
        data,
        dataError,
        pending: false,
      };
    } else {
      return {
        functionError: {
          error: new Error(
            "You need to set shipping address before modifying promo code."
          ),
          type: FunctionErrorCheckoutTypes.SHIPPING_ADDRESS_NOT_SET,
        },
        pending: false,
      };
    }
  };

  removePromoCode = async (
    promoCode: string
  ): PromiseRunResponse<DataErrorCheckoutTypes, FunctionErrorCheckoutTypes> => {
    await this.saleorState.provideCheckout(this.fireError);
    const checkoutId = this.saleorState.checkout?.id;

    if (checkoutId) {
      const {
        data,
        dataError,
      } = await this.checkoutJobQueue.runRemovePromoCode(checkoutId, promoCode);
      return {
        data,
        dataError,
        pending: false,
      };
    } else {
      return {
        functionError: {
          error: new Error(
            "You need to set shipping address before modifying promo code."
          ),
          type: FunctionErrorCheckoutTypes.SHIPPING_ADDRESS_NOT_SET,
        },
        pending: false,
      };
    }
  };

  createPayment = async (
    gateway: string,
    token: string,
    creditCard?: ICreditCard
  ): PromiseRunResponse<DataErrorCheckoutTypes, FunctionErrorCheckoutTypes> => {
    await this.saleorState.provideCheckout(this.fireError);
    await this.saleorState.providePayment();
    const checkoutId = this.saleorState.checkout?.id;
    const billingAddress = this.saleorState.checkout?.billingAddress;
    const amount = this.saleorState.summaryPrices?.totalPrice?.gross.amount;

    if (
      checkoutId &&
      billingAddress &&
      amount !== null &&
      amount !== undefined
    ) {
      const { data, dataError } = await this.checkoutJobQueue.runCreatePayment(
        checkoutId,
        amount,
        gateway,
        token,
        billingAddress,
        creditCard
      );
      return {
        data,
        dataError,
        pending: false,
      };
    } else {
      return {
        functionError: {
          error: new Error(
            "You need to set billing address before creating payment."
          ),
          type: FunctionErrorCheckoutTypes.SHIPPING_ADDRESS_NOT_SET,
        },
        pending: false,
      };
    }
  };

  completeCheckout = async (): PromiseRunResponse<
    DataErrorCheckoutTypes,
    FunctionErrorCheckoutTypes
  > => {
    await this.saleorState.provideCheckout(this.fireError);
    const checkoutId = this.saleorState.checkout?.id;

    if (checkoutId) {
      const {
        data,
        dataError,
      } = await this.checkoutJobQueue.runCompleteCheckout(checkoutId);
      return {
        data,
        dataError,
        pending: false,
      };
    } else {
      return {
        functionError: {
          error: new Error(
            "You need to set shipping address before creating payment."
          ),
          type: FunctionErrorCheckoutTypes.SHIPPING_ADDRESS_NOT_SET,
        },
        pending: false,
      };
    }
  };
}
