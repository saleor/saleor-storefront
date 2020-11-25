const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { parsed: env } = require("dotenv").config();

module.exports = withPlugins(
  [[optimizedImages, { handleImages: ["jpeg", "png", "webp", "gif"] }]],
  {
    env: {
      // API_URI: "http://localhost:8000/graphql/",
      API_URI: "https://demo.saleor.io/graphql/",
      DEMO_MODE: false,
      GTM_ID: undefined,
      SENTRY_APM: "0",
      SENTRY_DSN: null,
      ...env,
    },

    trailingSlash: true,

    webpack: (config, { isServer }) => {
      config.devtool = "source-map";

      config.node = {
        fs: "empty",
        module: "empty",
      };

      config.module.rules = [
        !isServer && {
          exclude: /node_modules/,
          loader: "ts-loader",
          options: {
            experimentalWatchApi: true,
            transpileOnly: true,
          },
          test: /\.(ts|tsx)$/,
        },
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
        {
          test: /\.(scss|css)$/,
          use: [
            isServer ? MiniCssExtractPlugin.loader : "style-loader",
            {
              loader: "css-loader",
              options: { sourceMap: true },
            },
            "sass-loader",
          ],
        },
      ].filter(Boolean);

      config.plugins = [
        ...config.plugins,
        new MiniCssExtractPlugin({
          filename: "[name].css",
          chunkFilename: "[id].css",
        }),
        !isServer &&
          new ForkTsCheckerWebpackPlugin({
            eslint: { mode: "write-references" },
            exclude: "node_modules",
          }),
      ].filter(Boolean);

      return config;
    },
  }
);
