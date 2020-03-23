import { CheckoutJobQueue } from "@sdk/jobs/Checkout";
import { CheckoutNetworkManager } from "@sdk/network";
import {
  CheckoutRepositoryManager,
  ICheckoutModel,
  LocalRepository,
} from "@sdk/repository";

import { APIProxy } from "../APIProxy";
import { ErrorListener } from "../utils";
import { ISaleorCheckoutAPI } from "./types";

export class SaleorCheckoutAPI extends ErrorListener
  implements ISaleorCheckoutAPI {
  checkout: ICheckoutModel | null;
  promoCode: string | null;
  shippingAsBilling: boolean;

  private checkoutRepositoryManager: CheckoutRepositoryManager;
  private checkoutNetworkManager: CheckoutNetworkManager;
  private checkoutJobQueue: CheckoutJobQueue;

  constructor(
    apiProxy: APIProxy,
    repository: LocalRepository,
    loadOnStart: boolean
  ) {
    super();
    this.checkout = null;
    this.promoCode = null;
    this.shippingAsBilling = false;

    this.checkoutRepositoryManager = new CheckoutRepositoryManager(repository);
    this.checkoutNetworkManager = new CheckoutNetworkManager(apiProxy);
    this.checkoutJobQueue = new CheckoutJobQueue(
      repository,
      this.checkoutNetworkManager,
      this.fireError
    );
    this.checkoutRepositoryManager.addOnCheckoutChangeListener(checkout => {
      this.checkout = checkout;
    });

    if (loadOnStart) {
      this.load();
    }
  }

  addItemToCart = async (variantId: string, quantity: number) => {
    await this.provideCheckout();

    // 1. save in local storage
    this.checkoutRepositoryManager.addItemToCart(
      this.checkout,
      variantId,
      quantity
    );

    // 2. save online if possible (if checkout id available)
    if (this.checkout?.lines) {
      const {
        data,
        errors,
      } = await this.checkoutNetworkManager.getRefreshedCheckoutLines(
        this.checkout.lines
      );

      if (errors) {
        this.fireError(errors);
      } else {
        this.checkoutRepositoryManager.getRepository().setCheckout({
          ...this.checkout,
          lines: data,
        });
      }
    }
    if (this.checkout?.id) {
      this.checkoutJobQueue.enqueueSetCartItem();
      return {
        pending: true,
      };
    }
    return {
      pending: false,
    };
  };

  load = async () => {
    await this.provideCheckout(true);
    return {
      pending: false,
    };
  };

  removeItemFromCart = async (variantId: string) => {
    await this.provideCheckout();

    // 1. save in local storage
    this.checkoutRepositoryManager.removeItemFromCart(this.checkout, variantId);
    // 2. save online if possible (if checkout id available)
    if (this.checkout?.lines) {
      const {
        data,
        errors,
      } = await this.checkoutNetworkManager.getRefreshedCheckoutLines(
        this.checkout.lines
      );

      if (errors) {
        this.fireError(errors);
      } else {
        this.checkoutRepositoryManager.getRepository().setCheckout({
          ...this.checkout,
          lines: data,
        });
      }
    }
    if (this.checkout?.id) {
      this.checkoutJobQueue.enqueueSetCartItem();
      return {
        pending: true,
      };
    }
    return {
      pending: false,
    };
  };

  /**
   * Method not implemented yet
   */
  setBillingAddress = () =>
    Promise.resolve({
      pending: false,
    });

  /**
   * Method not implemented yet
   */
  setShippingAddress = () =>
    Promise.resolve({
      pending: false,
    });

  /**
   * Method not implemented yet
   */
  setShippingAsBillingAddress = () =>
    Promise.resolve({
      pending: false,
    });

  subtractItemFromCart = async (variantId: string) => {
    await this.provideCheckout();

    // 1. save in local storage
    this.checkoutRepositoryManager.subtractItemFromCart(
      this.checkout,
      variantId
    );

    // 2. save online if possible (if checkout id available)
    if (this.checkout?.lines) {
      const {
        data,
        errors,
      } = await this.checkoutNetworkManager.getRefreshedCheckoutLines(
        this.checkout.lines
      );

      if (errors) {
        this.fireError(errors);
      } else {
        this.checkoutRepositoryManager.getRepository().setCheckout({
          ...this.checkout,
          lines: data,
        });
      }
    }
    if (this.checkout?.id) {
      this.checkoutJobQueue.enqueueSetCartItem();
      return {
        pending: true,
      };
    }
    return {
      pending: false,
    };
  };

  updateItemInCart = async (variantId: string, quantity: number) => {
    await this.provideCheckout();

    // 1. save in local storage
    this.checkoutRepositoryManager.updateItemInCart(
      this.checkout,
      variantId,
      quantity
    );

    // 2. save online if possible (if checkout id available)
    if (this.checkout?.lines) {
      const {
        data,
        errors,
      } = await this.checkoutNetworkManager.getRefreshedCheckoutLines(
        this.checkout.lines
      );

      if (errors) {
        this.fireError(errors);
      } else {
        this.checkoutRepositoryManager.getRepository().setCheckout({
          ...this.checkout,
          lines: data,
        });
      }
    }
    if (this.checkout?.id) {
      this.checkoutJobQueue.enqueueSetCartItem();
      return {
        pending: true,
      };
    }
    return {
      pending: false,
    };
  };

  /**
   * Method not implemented yet
   */
  makeOrder = () =>
    Promise.resolve({
      pending: false,
    });

  private isCheckoutCreatedOnline = () => this.checkout?.id;

  private provideCheckout = async (forceReload?: boolean) => {
    if (this.isCheckoutCreatedOnline() && !forceReload) {
      return;
    }

    if (navigator.onLine) {
      await this.provideCheckoutOnline();
    } else {
      this.provideCheckoutOffline(forceReload);
    }
  };

  private provideCheckoutOnline = async () => {
    // 1. Try to take checkout from backend database
    const checkoutToken = this.checkoutRepositoryManager
      .getRepository()
      .getCheckoutToken();

    const { data, errors } = await this.checkoutNetworkManager.getCheckout(
      checkoutToken
    );

    if (errors) {
      this.fireError(errors);
    } else if (data) {
      this.checkoutRepositoryManager.getRepository().setCheckout(data);
      this.checkout = data;
      return;
    }

    // 2.a. Try to take checkout from local storage
    if (!this.checkout) {
      let checkoutModel: ICheckoutModel | null;
      checkoutModel = this.checkoutRepositoryManager
        .getRepository()
        .getCheckout();

      if (checkoutModel) {
        this.checkout = checkoutModel;
      }
    }

    // 2.b. Try to take new created checkout from backend
    if (this.checkout) {
      const { email, shippingAddress, billingAddress, lines } = this.checkout;
      if (email && shippingAddress && billingAddress && lines) {
        const alteredLines = lines.map(item => ({
          quantity: item!.quantity,
          variantId: item?.variant!.id,
        }));

        const {
          data,
          errors,
        } = await this.checkoutNetworkManager.createCheckout(
          email,
          shippingAddress,
          billingAddress,
          alteredLines
        );

        if (errors) {
          this.fireError(errors);
        } else if (data) {
          this.checkoutRepositoryManager.getRepository().setCheckout(data);
          this.checkout = data;
          return;
        }
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
    checkoutModel = this.checkoutRepositoryManager
      .getRepository()
      .getCheckout();

    if (checkoutModel) {
      this.checkout = checkoutModel;
      return;
    }
  };
}
