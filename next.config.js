const { parsed: env } = require("dotenv").config();
const sass = require("@zeit/next-sass");
const css = require("@zeit/next-css");
const images = require("next-images");
const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");
const sourceMaps = require("@zeit/next-source-maps");

// next-optimized-images

module.exports = withPlugins(
  [
    [
      sass,
      {
        sassLoaderOptions: { sourceMap: true },
      },
    ],
    [
      optimizedImages,
      {
        /**
         * TODO:
         * Plugin breaks file loader for svg, find a way to use it as a default here.
         */
        handleImages: ["jpeg", "png", "webp", "gif"],
      },
    ],
  ],
  {
    env: {
      API_URI: "http://localhost:8000/graphql/",
      DEMO_MODE: false,
      GTM_ID: undefined,
      SENTRY_APM: "0",
      SENTRY_DSN: null,
      ...env,
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      config.module.rules = [
        ...config.module.rules,
        {
          test: /\.svg$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                publicPath: "/_next/static/images/",
                outputPath: "static/images/",
              },
            },
          ],
        },
      ];

      return config;
    },
  }
);
