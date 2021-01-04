const { InjectManifest } = require("workbox-webpack-plugin");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const { srcDir } = require("./constants");
const { exportSw } = require("./utils");

const sericeWorkerFile = "service-worker.js";
const sericeWorkerPath = `/static/${sericeWorkerFile}`;
const serviceWorkerDest = `.next${sericeWorkerPath}`;
const serviceWorkerUrl = `/${sericeWorkerFile}`;

const generateInDevMode = isDev =>
  isDev ? process.env.SERVICE_WORKER === "true" : true;

module.exports = (nextConfig = {}, { nextComposePlugins, phase }) => {
  const addSw = generateInDevMode(phase === PHASE_DEVELOPMENT_SERVER);

  return {
    ...nextConfig,

    env: {
      ...nextConfig.env,
      ...(addSw && {
        SERVICE_WORKER_EXISTS: true,
        SERVICE_WORKER_TIMEOUT: "60000",
        SERVICE_WORKER_URL: serviceWorkerUrl,
      }),
    },

    exportPathMap: exportSw(nextConfig, serviceWorkerDest, sericeWorkerFile),

    webpack: (config, options) => {
      const { buildId, isServer, dev, webpack } = options;

      if (!isServer && addSw) {
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
          new InjectManifest({
            swSrc: path.resolve(srcDir, "serviceWorker", "index.ts"),
            swDest: path.resolve(serviceWorkerDest),
            dontCacheBustURLsMatching: /^\/_next\/static\//,
            /*
             * In development mode pre-cache files up-to 10MB
             */
            maximumFileSizeToCacheInBytes: dev ? 10000000 : undefined,
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
              "public/": "/_next/public/",
            },
          })
        );
      }

      return typeof nextConfig.webpack === "function"
        ? nextConfig.webpack(config, options)
        : config;
    },
    /**
     * Rewite service worker serve path for production server only.
     */
    async rewrites() {
      return [
        {
          source: serviceWorkerUrl,
          destination: `/_next${sericeWorkerPath}`,
        },
      ];
    },
  };
};
