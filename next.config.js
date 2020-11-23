const { parsed: env } = require("dotenv").config();
const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = withPlugins(
  [[optimizedImages, { handleImages: ["jpeg", "png", "webp", "gif"] }]],
  {
    env: {
      API_URI: "http://localhost:8000/graphql/",
      DEMO_MODE: false,
      GTM_ID: undefined,
      SENTRY_APM: "0",
      SENTRY_DSN: null,
      ...env,
    },

    trailingSlash: true,

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

      if (!isServer) {
        config.devtool = "source-map";
        config.module.rules.push({
          test: /\.(scss|css)$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: { sourceMap: true },
            },
            { loader: "sass-loader" },
          ],
        });
      }

      config.plugins = [
        ...config.plugins,
        new MiniCssExtractPlugin({
          filename: "[name].css",
          chunkFilename: "[id].css",
        }),
      ];

      return config;
    },
  }
);
