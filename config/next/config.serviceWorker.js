const withOffline = require("next-offline");
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (nextConfig = {}, { nextComposePlugins, phase }) => {
  const swDest = "static/service-worker.js";
  const config = {
    ...nextConfig,
    env: {
      ...nextConfig.env,
      SERVICE_WORKER_EXISTS: true,
      SERVICE_WORKER_TIMEOUT: "60000",
    },
    target: "serverless",
    generateInDevMode: process.env.SERVICE_WORKER === "true",
    sourcemap: true,
    dontAutoRegisterSw: true,
    transformManifest: manifest => ["/"].concat(manifest),
    workboxOpts: {
      swDest: process.env.NEXT_EXPORT ? "service-worker.js" : swDest,
      exclude: [
        /\.map$/,
        /\manifest.*\.js(?:on)?$/,
        /\.js.map$/,
        /\.css.map/,
        /\.xls$/,
        /\.pdf$/,
        /\.csv$/,
      ],
      /**
       * Next does not generate index.html for pages calling getServerSideProps and getInitialProps, and probably
       * we will use it to get initial metadata.
       * (?) We will have to use sth like dynamicUrlToDependencies / templatedURLs.
       * https://developers.google.com/web/tools/workbox/guides/migrations/migrate-from-sw?hl=en
       * https://stackoverflow.com/a/42182693
       * navigateFallback: "index.html",
       *  navigateFallbackDenylist: [
       *    /\/graphql/,
       *    /\/dashboard/,
       *    /\/media\/export_files/,
       *    /\/plugins/,
       *    /\/storybook/,
       *    /\/__/, // used by cypress tests runner
       *    /\?(.+&)?no-cache=1$/,
       *  ],
       *  Or NetworkOnly might have the same effect.
       */
      maximumFileSizeToCacheInBytes:
        phase === PHASE_DEVELOPMENT_SERVER ? 52428800 : 1048576,
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: /\/(graphql|dashboard|media|plugins|storybook|__)|\?(.+&)?no-cache=1$/,
          handler: "NetworkOnly",
        },
        {
          urlPattern: /\.(?:png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/,
          handler: "NetworkFirst",
          options: {
            cacheName: "saleor-store-front",
            networkTimeoutSeconds: 15,
            expiration: {
              maxEntries: 150,
              maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },
    async rewrites() {
      return [
        {
          source: "/service-worker.js",
          destination: `/_next/${swDest}`,
        },
      ];
    },
  };

  return withOffline(config);
};
