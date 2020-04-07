import { NamedObservable } from "../helpers";
import { CheckoutNetworkManager } from "../network";
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

  private repository: LocalRepository;
  private checkoutNetworkManager: CheckoutNetworkManager;

  constructor(
    repository: LocalRepository,
    checkoutNetworkManager: CheckoutNetworkManager
  ) {
    super();
    this.repository = repository;
    this.checkoutNetworkManager = checkoutNetworkManager;

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
    onError: (error: ApolloErrorWithUserInput | any) => any,
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

  updateSelectedShippingAddressId = (selectedShippingAddressId?: string) => {
    this.selectedShippingAddressId = selectedShippingAddressId;
    this.notifyChange(
      StateItems.SELECTED_SHIPPING_ADDRESS_ID,
      this.selectedShippingAddressId
    );
  };

  updateSelectedBillingAddressId = (selectedBillingAddressId?: string) => {
    this.selectedBillingAddressId = selectedBillingAddressId;
    this.notifyChange(
      StateItems.SELECTED_BILLING_ADDRESS_ID,
      this.selectedBillingAddressId
    );
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

  private isCheckoutCreatedOnline = () => this.checkout?.id;

  private provideCheckoutOnline = async (
    onError: (error: ApolloErrorWithUserInput | any) => any
  ) => {
    // 1. Try to take checkout from backend database
    const checkout = this.repository.getCheckout();

    const { data, errors } = await this.checkoutNetworkManager.getCheckout(
      checkout?.token
    );

    if (errors) {
      onError(errors);
    } else if (data) {
      this.repository.setCheckout(data);
      // this.updateCheckout(data);
      return;
    }

    // 2.a. Try to take checkout from local storage
    const checkoutModel: ICheckoutModel | null = this.repository.getCheckout();
    if (checkoutModel && checkoutModel.id) {
      this.onCheckoutUpdate(checkoutModel);
      return;
    }

    // 2.b. Try to take new created checkout from backend
    if (checkoutModel && !checkoutModel.id) {
      const { email, shippingAddress, billingAddress, lines } = checkoutModel;
      if (email && shippingAddress && lines) {
        const alteredLines = lines.map((item) => ({
          quantity: item!.quantity,
          variantId: item?.variant!.id,
        }));

        const {
          data,
          errors,
        } = await this.checkoutNetworkManager.createCheckout(
          email,
          alteredLines,
          shippingAddress,
          billingAddress || undefined
        );

        if (errors) {
          onError(errors);
        } else if (data) {
          this.repository.setCheckout(data);
          // this.updateCheckout(data);
          return;
        } else {
          this.onCheckoutUpdate(checkoutModel);
          return;
        }
      } else {
        this.onCheckoutUpdate(checkoutModel);
        return;
      }
    }
  };

  private provideCheckoutOffline = (forceReload?: boolean) => {
    // 1. Try to take checkout from runtime memory (if exist in memory - has any checkout data)
    if (this.checkout && !forceReload) {
      return;
    }

    // 2. Try to take checkout from local storage
    let checkoutModel: ICheckoutModel | null;
    checkoutModel = this.repository.getCheckout();

    if (checkoutModel) {
      this.onCheckoutUpdate(checkoutModel);
      return;
    }
  };

  private providePaymentOffline = (forceReload?: boolean) => {
    // 1. Try to take checkout from runtime memory (if exist in memory - has any checkout data)
    if (this.payment && !forceReload) {
      return;
    }

    // 2. Try to take checkout from local storage
    let paymentModel: ICheckoutModel | null;
    paymentModel = this.repository.getPayment();

    if (paymentModel) {
      this.onPaymentUpdate(paymentModel);
      return;
    }
  };

  private calculateSummaryPrices(
    checkout?: ICheckoutModel
  ): ISaleorStateSummeryPrices | undefined {
    const items = checkout?.lines;
    const shippingMethod = checkout?.shippingMethod;

    if (items && items.length) {
      const firstItemTotalPrice = items[0].totalPrice;

      if (firstItemTotalPrice) {
        const shippingPrice = {
          ...shippingMethod?.price,
          amount: shippingMethod?.price?.amount || 0,
          currency: shippingMethod?.price?.currency || "",
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
            amount: itmesGrossPrice,
          },
          net: {
            ...firstItemTotalPrice.net,
            amount: itemsNetPrice,
          },
        };

        const totalPrice = {
          ...subtotalPrice,
          gross: {
            ...subtotalPrice.gross,
            amount: itmesGrossPrice + shippingPrice.amount,
          },
          net: {
            ...subtotalPrice.net,
            amount: itemsNetPrice + shippingPrice.amount,
          },
        };

        return {
          shippingPrice,
          subtotalPrice,
          totalPrice,
        };
      }
    }
  }
}
