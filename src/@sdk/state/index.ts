import { round } from "lodash";

import { DataErrorCheckoutTypes } from "../api/Checkout/types";
import { NamedObservable } from "../helpers";
import { NetworkManager } from "../network";
import { GetShopPaymentGateways_shop_availablePaymentGateways } from "../queries/types/GetShopPaymentGateways";
import { ApolloErrorWithUserInput } from "../react/types";
import {
  ICheckoutModel,
  IPaymentModel,
  LocalRepository,
  LocalStorageItems,
} from "../repository";
import { ISaleorState, ISaleorStateSummeryPrices, StateItems } from "./types";

export class SaleorState extends NamedObservable<StateItems>
  implements ISaleorState {
  checkout?: ICheckoutModel;
  promoCode?: string;
  selectedShippingAddressId?: string;
  selectedBillingAddressId?: string;
  payment?: IPaymentModel;
  summaryPrices?: ISaleorStateSummeryPrices;
  // Should be changed it in future to shop object containing payment gateways besides all the shop data
  availablePaymentGateways?: GetShopPaymentGateways_shop_availablePaymentGateways[];

  private repository: LocalRepository;
  private networkManager: NetworkManager;

  constructor(repository: LocalRepository, networkManager: NetworkManager) {
    super();
    this.repository = repository;
    this.networkManager = networkManager;

    repository.subscribeToChange(
      LocalStorageItems.CHECKOUT,
      this.onCheckoutUpdate
    );
    repository.subscribeToChange(
      LocalStorageItems.PAYMENT,
      this.onPaymentUpdate
    );
  }

  provideCheckout = async (
    onError: (
      error: ApolloErrorWithUserInput | any,
      type: DataErrorCheckoutTypes
    ) => any,
    forceReload?: boolean
  ) => {
    if (this.isCheckoutCreatedOnline() && !forceReload) {
      return;
    }

    if (navigator.onLine) {
      await this.provideCheckoutOnline(onError);
    } else {
      this.provideCheckoutOffline(forceReload);
    }

    return;
  };

  providePayment = async (forceReload?: boolean) => {
    this.providePaymentOffline(forceReload);

    return;
  };

  providePaymentGateways = async (
    onError: (
      error: ApolloErrorWithUserInput | any,
      type: DataErrorCheckoutTypes
    ) => any
  ) => {
    await this.providePaymentGatewaysOnline(onError);
  };

  private onCheckoutUpdate = (checkout: ICheckoutModel) => {
    this.checkout = checkout;
    this.summaryPrices = this.calculateSummaryPrices(checkout);
    this.notifyChange(StateItems.CHECKOUT, this.checkout);
    this.notifyChange(StateItems.SUMMARY_PRICES, this.summaryPrices);
  };
  private onPaymentUpdate = (payment: IPaymentModel) => {
    this.payment = payment;
    this.notifyChange(StateItems.PAYMENT, this.payment);
  };
  private onPaymentGatewaysUpdate = (
    paymentGateways?: GetShopPaymentGateways_shop_availablePaymentGateways[]
  ) => {
    this.availablePaymentGateways = paymentGateways;
    this.notifyChange(
      StateItems.PAYMENT_GATEWAYS,
      this.availablePaymentGateways
    );
  };

  private isCheckoutCreatedOnline = () => this.checkout?.id;

  private provideCheckoutOnline = async (
    onError: (
      error: ApolloErrorWithUserInput | any,
      type: DataErrorCheckoutTypes
    ) => any
  ) => {
    // 1. Try to take checkout from backend database
    const checkout = this.repository.getCheckout();

    if (checkout?.token) {
      const { data, error } = await this.networkManager.getCheckout(
        checkout?.token
      );

      if (error) {
        onError(error, DataErrorCheckoutTypes.GET_CHECKOUT);
      } else if (data) {
        this.repository.setCheckout(data);
        // this.updateCheckout(data);
        return;
      }
    }

    // 2. Try to take checkout from local storage
    const checkoutModel: ICheckoutModel | null = this.repository.getCheckout();
    if (checkoutModel) {
      this.onCheckoutUpdate(checkoutModel);
      return;
    }
  };

  private provideCheckoutOffline = (forceReload?: boolean) => {
    // 1. Try to take checkout from runtime memory (if exist in memory - has any checkout data)
    if (this.checkout && !forceReload) {
      return;
    }

    // 2. Try to take checkout from local storage
    const checkoutModel: ICheckoutModel | null = this.repository.getCheckout();

    if (checkoutModel) {
      this.onCheckoutUpdate(checkoutModel);
    } else {
      this.repository.setCheckout({});
    }
  };

  private providePaymentOffline = (forceReload?: boolean) => {
    // 1. Try to take checkout from runtime memory (if exist in memory - has any checkout data)
    if (this.payment && !forceReload) {
      return;
    }

    // 2. Try to take checkout from local storage
    const paymentModel: ICheckoutModel | null = this.repository.getPayment();

    if (paymentModel) {
      this.onPaymentUpdate(paymentModel);
    } else {
      this.repository.setPayment({});
    }
  };

  private providePaymentGatewaysOnline = async (
    onError: (
      error: ApolloErrorWithUserInput | any,
      type: DataErrorCheckoutTypes
    ) => any
  ) => {
    const { data, error } = await this.networkManager.getPaymentGateways();

    if (error) {
      onError(error, DataErrorCheckoutTypes.GET_PAYMENT_GATEWAYS);
    }

    this.onPaymentGatewaysUpdate(data);
  };

  private calculateSummaryPrices(
    checkout?: ICheckoutModel
  ): ISaleorStateSummeryPrices {
    const items = checkout?.lines;
    const shippingMethod = checkout?.shippingMethod;
    const promoCodeDiscount = checkout?.promoCodeDiscount?.discount;

    if (items && items.length) {
      const firstItemTotalPrice = items[0].totalPrice;

      if (firstItemTotalPrice) {
        const shippingPrice = {
          ...shippingMethod?.price,
          amount: shippingMethod?.price?.amount || 0,
          currency:
            shippingMethod?.price?.currency ||
            firstItemTotalPrice.gross.currency,
        };

        const { itemsNetPrice, itmesGrossPrice } = items.reduce(
          (prevVals, item) => {
            prevVals.itemsNetPrice += item.totalPrice?.net.amount || 0;
            prevVals.itmesGrossPrice += item.totalPrice?.gross.amount || 0;
            return prevVals;
          },
          {
            itemsNetPrice: 0,
            itmesGrossPrice: 0,
          }
        );

        const subtotalPrice = {
          ...firstItemTotalPrice,
          gross: {
            ...firstItemTotalPrice.gross,
            amount: round(itmesGrossPrice, 2),
          },
          net: {
            ...firstItemTotalPrice.net,
            amount: round(itemsNetPrice, 2),
          },
        };

        const discount = {
          ...promoCodeDiscount,
          amount: promoCodeDiscount?.amount || 0,
          currency:
            promoCodeDiscount?.currency || firstItemTotalPrice.gross.currency,
        };

        const totalPrice = {
          ...subtotalPrice,
          gross: {
            ...subtotalPrice.gross,
            amount: round(
              itmesGrossPrice + shippingPrice.amount - discount.amount,
              2
            ),
          },
          net: {
            ...subtotalPrice.net,
            amount: round(
              itemsNetPrice + shippingPrice.amount - discount.amount,
              2
            ),
          },
        };

        return {
          discount,
          shippingPrice,
          subtotalPrice,
          totalPrice,
        };
      }
    }
    return {};
  }
}
