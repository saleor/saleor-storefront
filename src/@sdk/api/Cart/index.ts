import { ErrorListener } from "@sdk/helpers";
import { CheckoutNetworkManager } from "@sdk/network";
import {
  CheckoutRepositoryManager,
  ICheckoutModel,
  ICheckoutModelLine,
  ICheckoutModelPrice,
} from "@sdk/repository";
import { SaleorState } from "@sdk/state";
import { StateItems } from "@sdk/state/types";
import { CartJobQueue } from "@temp/@sdk/jobs/Cart";

import {
  IItems,
  ISaleorCartAPI,
  IShippingPrice,
  ISubtotalPrice,
  ITotalPrice,
} from "./types";

export class SaleorCartAPI extends ErrorListener implements ISaleorCartAPI {
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

    this.saleorState.subscribeToChange(
      StateItems.CHECKOUT,
      ({ lines, totalPrice, subtotalPrice, shippingPrice }: ICheckoutModel) => {
        this.items = lines
          ?.filter(line => line.quantity > 0)
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
        this.totalPrice = totalPrice;
        this.subtotalPrice = subtotalPrice;
        this.shippingPrice = shippingPrice;
      }
    );

    if (loadOnStart) {
      this.load();
    }
  }

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
        const summaryPrices = this.getSummaryPricesForItems(data);
        this.checkoutRepositoryManager.getRepository().setCheckout({
          ...this.saleorState.checkout,
          lines: data,
          subtotalPrice: summaryPrices?.subtotalPrice,
          totalPrice: summaryPrices?.totalPrice,
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
        const summaryPrices = this.getSummaryPricesForItems(data);
        this.checkoutRepositoryManager.getRepository().setCheckout({
          ...this.saleorState.checkout,
          lines: data,
          subtotalPrice: summaryPrices?.subtotalPrice,
          totalPrice: summaryPrices?.totalPrice,
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
        const summaryPrices = this.getSummaryPricesForItems(data);
        this.checkoutRepositoryManager.getRepository().setCheckout({
          ...this.saleorState.checkout,
          lines: data,
          subtotalPrice: summaryPrices?.subtotalPrice,
          totalPrice: summaryPrices?.totalPrice,
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
        const summaryPrices = this.getSummaryPricesForItems(data);
        this.checkoutRepositoryManager.getRepository().setCheckout({
          ...this.saleorState.checkout,
          lines: data,
          subtotalPrice: summaryPrices?.subtotalPrice,
          totalPrice: summaryPrices?.totalPrice,
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

  private getSummaryPricesForItems(
    items?: ICheckoutModelLine[] | null
  ):
    | {
        totalPrice?: ICheckoutModelPrice;
        subtotalPrice?: ICheckoutModelPrice;
      }
    | undefined {
    if (items && items.length) {
      const firstItemTotalPrice = items[0].totalPrice;

      if (firstItemTotalPrice) {
        const {
          firstItemGrossTotalPrice,
          firstItemNetTotalPrice,
        } = items.reduce(
          (prevVals, item) => {
            prevVals.firstItemGrossTotalPrice +=
              item.totalPrice?.gross.amount || 0;
            prevVals.firstItemNetTotalPrice += item.totalPrice?.net.amount || 0;
            return prevVals;
          },
          {
            firstItemGrossTotalPrice: 0,
            firstItemNetTotalPrice: 0,
          }
        );

        const totalPrice = {
          ...firstItemTotalPrice,
          gross: {
            ...firstItemTotalPrice?.gross,
            amount: firstItemGrossTotalPrice,
          },
          net: {
            ...firstItemTotalPrice?.net,
            amount: firstItemNetTotalPrice,
          },
        };

        const subtotalGrossPrice =
          totalPrice.gross.amount - (this.shippingPrice?.gross.amount || 0);
        const subtotalNetPrice =
          totalPrice.net.amount - (this.shippingPrice?.net.amount || 0);

        const subtotalPrice = {
          ...totalPrice,
          gross: {
            ...totalPrice.gross,
            amount: subtotalGrossPrice,
          },
          net: {
            ...totalPrice.net,
            amount: subtotalNetPrice,
          },
        };

        return {
          subtotalPrice,
          totalPrice,
        };
      }
    }
  }
}
