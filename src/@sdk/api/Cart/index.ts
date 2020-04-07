import { ErrorListener } from "@sdk/helpers";
import { CheckoutNetworkManager } from "@sdk/network";
import { CheckoutRepositoryManager, ICheckoutModel } from "@sdk/repository";
import { SaleorState } from "@sdk/state";
import { ISaleorStateSummeryPrices, StateItems } from "@sdk/state/types";
import { CartJobQueue } from "@temp/@sdk/jobs/Cart";

import {
  IItems,
  ISaleorCartAPI,
  IShippingPrice,
  ISubtotalPrice,
  ITotalPrice,
} from "./types";

export class SaleorCartAPI extends ErrorListener implements ISaleorCartAPI {
  loaded: boolean;
  items: IItems;
  totalPrice: ITotalPrice;
  subtotalPrice: ISubtotalPrice;
  shippingPrice: IShippingPrice;

  private checkoutRepositoryManager: CheckoutRepositoryManager;
  private saleorState: SaleorState;
  private checkoutNetworkManager: CheckoutNetworkManager;
  private cartJobQueue: CartJobQueue;

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
    this.cartJobQueue = new CartJobQueue(
      this.checkoutRepositoryManager.getRepository(),
      this.checkoutNetworkManager,
      this.fireError
    );
    this.loaded = false;

    this.saleorState.subscribeToChange(
      StateItems.CHECKOUT,
      ({ lines }: ICheckoutModel) => {
        this.items = lines
          ?.filter((line) => line.quantity > 0)
          .sort((a, b) => {
            if (a.id && b.id) {
              const aId = a.id?.toUpperCase() || "";
              const bId = b.id?.toUpperCase() || "";
              return aId < bId ? -1 : aId > bId ? 1 : 0;
            } else {
              const aId = a.variant.id?.toUpperCase() || "";
              const bId = b.variant.id?.toUpperCase() || "";
              return aId < bId ? -1 : aId > bId ? 1 : 0;
            }
          });
      }
    );
    this.saleorState.subscribeToChange(
      StateItems.SUMMARY_PRICES,
      ({
        totalPrice,
        subtotalPrice,
        shippingPrice,
      }: ISaleorStateSummeryPrices) => {
        this.totalPrice = totalPrice;
        this.subtotalPrice = subtotalPrice;
        this.shippingPrice = shippingPrice;
      }
    );

    if (loadOnStart) {
      this.load();
    }
  }

  load = async () => {
    await this.saleorState.provideCheckout(this.fireError, true);
    this.loaded = true;
    return {
      pending: false,
    };
  };

  addItem = async (variantId: string, quantity: number) => {
    await this.saleorState.provideCheckout(this.fireError);

    // 1. save in local storage
    this.checkoutRepositoryManager.addItemToCart(variantId, quantity);

    // 2. save online if possible (if checkout id available)
    if (this.saleorState.checkout?.lines) {
      const {
        data,
        errors,
      } = await this.checkoutNetworkManager.getRefreshedCheckoutLines(
        this.saleorState.checkout.lines
      );

      if (errors) {
        this.fireError(errors);
      } else {
        this.checkoutRepositoryManager.getRepository().setCheckout({
          ...this.saleorState.checkout,
          lines: data,
        });
      }
    }
    if (this.saleorState.checkout?.id) {
      this.cartJobQueue.enqueueSetCartItem();
      return {
        pending: true,
      };
    }
    return {
      pending: false,
    };
  };

  removeItem = async (variantId: string) => {
    await this.saleorState.provideCheckout(this.fireError);

    // 1. save in local storage
    this.checkoutRepositoryManager.removeItemFromCart(variantId);
    // 2. save online if possible (if checkout id available)
    if (this.saleorState.checkout?.lines) {
      const {
        data,
        errors,
      } = await this.checkoutNetworkManager.getRefreshedCheckoutLines(
        this.saleorState.checkout.lines
      );

      if (errors) {
        this.fireError(errors);
      } else {
        this.checkoutRepositoryManager.getRepository().setCheckout({
          ...this.saleorState.checkout,
          lines: data,
        });
      }
    }
    if (this.saleorState.checkout?.id) {
      this.cartJobQueue.enqueueSetCartItem();
      return {
        pending: true,
      };
    }
    return {
      pending: false,
    };
  };

  subtractItem = async (variantId: string) => {
    await this.saleorState.provideCheckout(this.fireError);

    // 1. save in local storage
    this.checkoutRepositoryManager.subtractItemFromCart(variantId);

    // 2. save online if possible (if checkout id available)
    if (this.saleorState.checkout?.lines) {
      const {
        data,
        errors,
      } = await this.checkoutNetworkManager.getRefreshedCheckoutLines(
        this.saleorState.checkout.lines
      );

      if (errors) {
        this.fireError(errors);
      } else {
        this.checkoutRepositoryManager.getRepository().setCheckout({
          ...this.saleorState.checkout,
          lines: data,
        });
      }
    }
    if (this.saleorState.checkout?.id) {
      this.cartJobQueue.enqueueSetCartItem();
      return {
        pending: true,
      };
    }
    return {
      pending: false,
    };
  };

  updateItem = async (variantId: string, quantity: number) => {
    await this.saleorState.provideCheckout(this.fireError);

    // 1. save in local storage
    this.checkoutRepositoryManager.updateItemInCart(variantId, quantity);

    // 2. save online if possible (if checkout id available)
    if (this.saleorState.checkout?.lines) {
      const {
        data,
        errors,
      } = await this.checkoutNetworkManager.getRefreshedCheckoutLines(
        this.saleorState.checkout.lines
      );

      if (errors) {
        this.fireError(errors);
      } else {
        this.checkoutRepositoryManager.getRepository().setCheckout({
          ...this.saleorState.checkout,
          lines: data,
        });
      }
    }
    if (this.saleorState.checkout?.id) {
      this.cartJobQueue.enqueueSetCartItem();
      return {
        pending: true,
      };
    }
    return {
      pending: false,
    };
  };
}
