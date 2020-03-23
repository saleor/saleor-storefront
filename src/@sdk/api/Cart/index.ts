import { ErrorListener } from "@sdk/helpers";
import { CheckoutNetworkManager } from "@sdk/network";
import { CheckoutRepositoryManager, ICheckoutModel } from "@sdk/repository";
import { SaleorState } from "@sdk/state";
import { StateItems } from "@sdk/state/types";
import { CartJobQueue } from "@temp/@sdk/jobs/Cart";

import { IItems, ISaleorCartAPI } from "./types";

export class SaleorCartAPI extends ErrorListener implements ISaleorCartAPI {
  items: IItems;

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
    this.items = null;

    this.saleorState = saleorState;
    this.checkoutRepositoryManager = checkoutRepositoryManager;
    this.checkoutNetworkManager = checkoutNetworkManager;
    this.cartJobQueue = new CartJobQueue(
      this.checkoutRepositoryManager.getRepository(),
      this.checkoutNetworkManager,
      this.fireError
    );

    this.saleorState.subscribeToChange(
      StateItems.CHECKOUT,
      ({ lines }: ICheckoutModel) => {
        this.items = lines?.filter(line => line.quantity > 0);
      }
    );

    if (loadOnStart) {
      this.load();
    }
  }

  addItem = async (variantId: string, quantity: number) => {
    await this.saleorState.provideCheckout(this.fireError);

    // 1. save in local storage
    this.checkoutRepositoryManager.addItemToCart(
      this.saleorState.checkout,
      variantId,
      quantity
    );

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

  load = async () => {
    await this.saleorState.provideCheckout(this.fireError, true);
    return {
      pending: false,
    };
  };

  removeItem = async (variantId: string) => {
    await this.saleorState.provideCheckout(this.fireError);

    // 1. save in local storage
    this.checkoutRepositoryManager.removeItemFromCart(
      this.saleorState.checkout,
      variantId
    );
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
    this.checkoutRepositoryManager.subtractItemFromCart(
      this.saleorState.checkout,
      variantId
    );

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
    this.checkoutRepositoryManager.updateItemInCart(
      this.saleorState.checkout,
      variantId,
      quantity
    );

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
