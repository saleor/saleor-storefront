import { defaultConfig } from "../config";
import { CheckoutNetworkManager } from "../network";
import { CheckoutRepositoryManager, LocalRepository } from "../repository";
import { SaleorState } from "../state";
import { Config } from "../types";
import { APIProxy } from "./APIProxy";
import { SaleorCartAPI } from "./Cart";
import { SaleorCheckoutAPI } from "./Checkout";

export * from "./Checkout";
export * from "./Cart";

// SaleorAPI.checkout....
// SaleorAPI.cart....

export class SaleorAPI {
  checkout: SaleorCheckoutAPI;
  cart: SaleorCartAPI;

  /**
   * @deprecated Please do not use it anymore. Reference to API Proxy will be removed in future.
   * Now it just exists for legacy React hooks, which also will be removed.
   */
  legacyAPIProxy: APIProxy;

  constructor(apiProxy: APIProxy, config?: Config, onStateUpdate?: () => any) {
    this.legacyAPIProxy = apiProxy;
    const finalConfig = {
      ...defaultConfig,
      ...config,
      loadOnStart: {
        ...defaultConfig.loadOnStart,
        ...config?.loadOnStart,
      },
    };
    const { loadOnStart } = finalConfig;

    const repository = new LocalRepository();
    const checkoutRepositoryManager = new CheckoutRepositoryManager(repository);
    const checkoutNetworkManager = new CheckoutNetworkManager(apiProxy);
    const saleorState = new SaleorState(repository, checkoutNetworkManager);

    if (onStateUpdate) {
      saleorState.subscribeToNotifiedChanges(onStateUpdate);
    }

    this.checkout = new SaleorCheckoutAPI(
      checkoutRepositoryManager,
      checkoutNetworkManager,
      saleorState,
      loadOnStart.checkout
    );
    this.cart = new SaleorCartAPI(
      checkoutRepositoryManager,
      checkoutNetworkManager,
      saleorState,
      loadOnStart.cart
    );
  }
}
