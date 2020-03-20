import { defaultConfig } from "../config";
import { LocalRepository } from "../repository";
import { Config } from "../types";
import { APIProxy } from "./APIProxy";
import { SaleorCheckoutAPI } from "./Checkout";

export * from "./Checkout";

// SaleorAPI.checkout....
// SaleorAPI.cart....

export class SaleorAPI {
  checkout: SaleorCheckoutAPI;

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
    this.checkout = new SaleorCheckoutAPI(
      apiProxy,
      repository,
      loadOnStart.checkout,
      onStateUpdate
    );
  }
}
