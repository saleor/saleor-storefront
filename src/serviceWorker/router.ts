import { cacheNames, RouteHandler, RouteHandlerObject } from "workbox-core";
import { RegExpRoute, Router as WorkboxRouter } from "workbox-routing";

import { getRequestedPageFromURL } from "./utils";

declare const self: ServiceWorkerGlobalScope;

interface Config {
  cacheName: string;
}

interface StrategyClass {
  new (...args: any): RouteHandlerObject;
}

export class Router {
  private _cacheName: string;

  private _ignoredRoutes: RegExp | undefined;

  private _workboxRouter: WorkboxRouter;

  constructor(cacheName: string) {
    this._cacheName = cacheName;
    this._workboxRouter = new WorkboxRouter();
    this._init();
  }

  private get config(): Config {
    return {
      cacheName: this._cacheName,
    };
  }

  private register(...args: [RegExp, RouteHandler]): void {
    this._workboxRouter.registerRoute(new RegExpRoute(...args));
  }

  private _init(): void {
    self.onfetch = this.handleFetch;
  }

  set ignoredRoutes(ignoredRoutes: RegExp) {
    this._ignoredRoutes = ignoredRoutes;
  }

  handleOfflineDocumentFetch = async (event: FetchEvent): Promise<Response> => {
    const {
      request: { url },
    } = event;

    /*
     * Make sure that build manifest includes
     * the pathname we're requesting.
     */
    const requestedPage = getRequestedPageFromURL(url);

    if (!requestedPage) {
      throw new Error("Requested page does not exist");
    }

    const cache = await self.caches.open(cacheNames.precache);
    const document = await cache.match(requestedPage, { ignoreSearch: true });

    if (!document) {
      throw new Error("Missing document cache");
    }

    return document;
  };

  handleFetch = async (event: FetchEvent): Promise<void> => {
    const { request } = event;
    const { url, destination } = request;

    if (this._ignoredRoutes && this._ignoredRoutes.test(url)) {
      return;
    }

    if (!navigator.onLine && destination === "document") {
      event.respondWith(this.handleOfflineDocumentFetch(event));

      return;
    }

    const response = this._workboxRouter.handleRequest({ request, event });

    if (!response) {
      return;
    }

    event.respondWith(response);
  };

  setRoute(route: RegExp, Strategy: StrategyClass): void {
    this.register(route, new Strategy(this.config));
  }

  setDefault(Strategy: StrategyClass): void {
    this._workboxRouter.setDefaultHandler(new Strategy(this.config));
  }
}
