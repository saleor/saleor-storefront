/* eslint-disable no-undef,no-restricted-globals */

import { baseUrl } from "@temp/constants";

workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.core.setCacheNameDetails({
  prefix: "saleor-store-front",
});

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

workbox.routing.registerRoute(
  new RegExp("^http.*(?:png|gif|jpg|jpeg|webp|svg|csv|pdf)"),
  new workbox.strategies.NetworkFirst()
);

workbox.routing.registerNavigationRoute(
  workbox.precaching.getCacheKeyForURL(`${baseUrl}index.html`),
  {
    blacklist: [
      new RegExp("/graphql"),
      new RegExp("/dashboard"),
      new RegExp("/media/export_files"),
    ],
  }
);
