import { ErrorListener } from "@sdk/helpers";
import { JobsManager } from "@sdk/jobs";
import { ICheckoutModel, IPaymentModel } from "@sdk/repository";
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
  availablePaymentGateways?: IAvailablePaymentGateways;
  payment?: IPayment;

  private saleorState: SaleorState;
  private jobsManager: JobsManager;

  private checkoutLoaded: boolean;
  private paymentLoaded: boolean;
  private paymentGatewaysLoaded: boolean;

  constructor(
    saleorState: SaleorState,
    loadOnStart: boolean,
    jobsManager: JobsManager
  ) {
    super();
    this.saleorState = saleorState;
    this.jobsManager = jobsManager;

    this.loaded = false;
    this.checkoutLoaded = false;
    this.paymentLoaded = false;
    this.paymentGatewaysLoaded = false;

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
        this.billingAsShipping = billingAsShipping;
        this.promoCodeDiscount = {
          discountName: promoCodeDiscount?.discountName,
          voucherCode: promoCodeDiscount?.voucherCode,
        };
        this.checkoutLoaded = true;
        this.loaded =
          this.checkoutLoaded &&
          this.paymentLoaded &&
          this.paymentGatewaysLoaded;
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
        this.paymentLoaded = true;
        this.loaded =
          this.paymentLoaded &&
          this.checkoutLoaded &&
          this.paymentGatewaysLoaded;
      }
    );
    this.saleorState.subscribeToChange(
      StateItems.PAYMENT_GATEWAYS,
      (paymentGateways: IAvailablePaymentGateways) => {
        this.availablePaymentGateways = paymentGateways;
        this.paymentGatewaysLoaded = true;
        this.loaded =
          this.paymentGatewaysLoaded &&
          this.paymentLoaded &&
          this.checkoutLoaded;
      }
    );

    if (loadOnStart) {
      this.load();
    }
  }

  load = async () => {
    await this.saleorState.provideCheckout(this.fireError, true);
    await this.saleorState.providePayment(true);
    await this.saleorState.providePaymentGateways(this.fireError);
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
      const { data, dataError } = await this.jobsManager.run(
        "checkout",
        "setShippingAddress",
        {
          checkoutId,
          email,
          selectedShippingAddressId: shippingAddress.id,
          shippingAddress,
        }
      );

      return {
        data,
        dataError,
        pending: false,
      };
    } else if (alteredLines) {
      const { data, dataError } = await this.jobsManager.run(
        "checkout",
        "createCheckout",
        {
          email,
          lines: alteredLines,
          selectedShippingAddressId: shippingAddress.id,
          shippingAddress,
        }
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
          type: FunctionErrorCheckoutTypes.ITEMS_NOT_ADDED_TO_CART,
        },
        pending: false,
      };
    }
  };

  setBillingAddress = async (
    billingAddress: IAddress,
    email?: string
  ): PromiseRunResponse<DataErrorCheckoutTypes, FunctionErrorCheckoutTypes> => {
    await this.saleorState.provideCheckout(this.fireError);
    const checkoutId = this.saleorState.checkout?.id;
    const isShippingRequiredForProducts = this.saleorState.checkout?.lines
      ?.filter(line => line.quantity > 0)
      .some(({ variant }) => variant.product?.productType.isShippingRequired);
    const alteredLines = this.saleorState.checkout?.lines?.map(item => ({
      quantity: item!.quantity,
      variantId: item?.variant!.id,
    }));

    if (
      isShippingRequiredForProducts &&
      checkoutId &&
      this.checkout?.shippingAddress
    ) {
      const { data, dataError } = await this.jobsManager.run(
        "checkout",
        "setBillingAddress",
        {
          billingAddress,
          billingAsShipping: false,
          checkoutId,
          selectedBillingAddressId: billingAddress.id,
        }
      );

      return {
        data,
        dataError,
        pending: false,
      };
    } else if (isShippingRequiredForProducts) {
      return {
        functionError: {
          error: new Error(
            "You need to set shipping address before setting billing address."
          ),
          type: FunctionErrorCheckoutTypes.SHIPPING_ADDRESS_NOT_SET,
        },
        pending: false,
      };
    } else if (
      !isShippingRequiredForProducts &&
      email &&
      checkoutId &&
      alteredLines
    ) {
      const { data, dataError } = await this.jobsManager.run(
        "checkout",
        "setBillingAddressWithEmail",
        {
          billingAddress,
          checkoutId,
          email,
          selectedBillingAddressId: billingAddress.id,
        }
      );

      return {
        data,
        dataError,
        pending: false,
      };
    } else if (!isShippingRequiredForProducts && email && alteredLines) {
      const { data, dataError } = await this.jobsManager.run(
        "checkout",
        "createCheckout",
        {
          billingAddress,
          email,
          lines: alteredLines,
          selectedBillingAddressId: billingAddress.id,
        }
      );

      return {
        data,
        dataError,
        pending: false,
      };
    } else if (!isShippingRequiredForProducts && !email) {
      return {
        functionError: {
          error: new Error(
            "You need to provide email when products do not require shipping before setting billing address."
          ),
          type: FunctionErrorCheckoutTypes.EMAIL_NOT_SET,
        },
        pending: false,
      };
    } else {
      return {
        functionError: {
          error: new Error(
            "You need to add items to cart before setting billing address."
          ),
          type: FunctionErrorCheckoutTypes.ITEMS_NOT_ADDED_TO_CART,
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
      const { data, dataError } = await this.jobsManager.run(
        "checkout",
        "setBillingAddress",
        {
          billingAddress: this.checkout.shippingAddress,
          billingAsShipping: true,
          checkoutId,
          selectedBillingAddressId: this.checkout?.shippingAddress.id,
        }
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
      const { data, dataError } = await this.jobsManager.run(
        "checkout",
        "setShippingMethod",
        {
          checkoutId,
          shippingMethodId,
        }
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
      const { data, dataError } = await this.jobsManager.run(
        "checkout",
        "addPromoCode",
        {
          checkoutId,
          promoCode,
        }
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
      const { data, dataError } = await this.jobsManager.run(
        "checkout",
        "removePromoCode",
        { checkoutId, promoCode }
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
      const { data, dataError } = await this.jobsManager.run(
        "checkout",
        "createPayment",
        {
          amount,
          billingAddress,
          checkoutId,
          creditCard,
          paymentGateway: gateway,
          paymentToken: token,
        }
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
      const { data, dataError } = await this.jobsManager.run(
        "checkout",
        "completeCheckout",
        { checkoutId }
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
            "You need to set shipping address before creating payment."
          ),
          type: FunctionErrorCheckoutTypes.SHIPPING_ADDRESS_NOT_SET,
        },
        pending: false,
      };
    }
  };
}
