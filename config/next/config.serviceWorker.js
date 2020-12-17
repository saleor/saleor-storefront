const WorkboxPlugin = require("workbox-webpack-plugin");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const { srcDir } = require("./constants");

const sericeWorkerPath = "/static/service-worker.js";
const serviceWorkerDest = `.next${sericeWorkerPath}`;
const serviceWorkerUrl = `/_next${sericeWorkerPath}`;

const generateInDevMode = isDev =>
  isDev ? process.env.SERVICE_WORKER === "true" : true;

module.exports = (nextConfig = {}, { nextComposePlugins, phase }) => ({
  ...nextConfig,

  env: {
    ...nextConfig.env,
    ...(generateInDevMode(phase === PHASE_DEVELOPMENT_SERVER) && {
      SERVICE_WORKER_EXISTS: true,
      SERVICE_WORKER_TIMEOUT: "60000",
      SERVICE_WORKER_URL: serviceWorkerUrl,
    }),
  },

  webpack: (config, options) => {
    const { buildId, isServer, dev, webpack } = options;

    if (!isServer && generateInDevMode(dev)) {
      const additionalManifestEntries = fs
        .readdirSync("public", { withFileTypes: true })
        /*
         * Add the public files to precache-manifest entries.
         *
         * We're creating an MD5 hash from file contents
         * to know if they've changed, so that the service worker
         * would know to recache them if they have.
         */
        .reduce((manifest, file) => {
          const { name } = file;

          // Filter out directories and hidden files.
          if (!file.isFile() || name.startsWith(".")) {
            return manifest;
          }

          return [
            ...manifest,
            {
              url: `/${name}`,
              revision: crypto
                .createHash("md5")
                .update(Buffer.from(fs.readFileSync(`public/${name}`)))
                .digest("hex"),
            },
          ];
        }, []);

      config.plugins.push(
        new WorkboxPlugin.InjectManifest({
          swSrc: path.resolve(srcDir, "serviceWorker", "index.ts"),
          swDest: path.resolve(serviceWorkerDest),
          dontCacheBustURLsMatching: /^\/_next\/static\//,
          /*
           * In development mode pre-cache files up-to 25MB
           */
          maximumFileSizeToCacheInBytes: dev ? 25000000 : undefined,
          additionalManifestEntries,
          webpackCompilationPlugins: [
            new webpack.DefinePlugin({
              "self.__BUILD_ID": JSON.stringify(buildId),
            }),
          ],
          exclude: [
            /\.css.map/i,
            /\.csv$/i,
            /\.js\.map$/i,
            /\.map$/i,
            /\.pdf$/i,
            /\.xls$/i,
            /\/_error\.js$/i,
            /\/react-refresh\.js$/i,
            /\manifest.*\.js(?:on)?$/i,
            /^build-manifest\.json$/i,
            /^react-loadable-manifest\.json$/i,
          ],
          modifyURLPrefix: {
            "static/": "/_next/static/",
          },
        })
      );
    }

    return typeof nextConfig.webpack === "function"
      ? nextConfig.webpack(config, options)
      : config;
  },

  headers: () => [
    {
      /*
       * Since we're outputing service worker
       * with static files in /_next/static directory
       * we have to return the service worker file with an additional header
       * so that the browser would know that it's safe to run it on the root scope.
       */
      source: serviceWorkerUrl,
      headers: [
        {
          key: "service-worker-allowed",
          value: "/",
        },
      ],
    },
  ],
});
