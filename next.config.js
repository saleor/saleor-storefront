const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { parsed: env } = require("dotenv").config();
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const path = require("path");

module.exports = withPlugins(
  [[optimizedImages, { handleImages: ["jpeg", "png", "webp", "gif"] }]],
  {
    env: {
      // API_URI: "http://localhost:8000/graphql/",
      // API_URI: "https://demo.saleor.io/graphql/",
      API_URI: "https://master.staging.saleor.rocks/graphql/",
      SALEOR_CHANNEL_SLUG: "default-channel",
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
          test: /\.tsx?$/,
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
            typescript: {
              mode: "write-references",
            },
            eslint: {
              files: "./src/**/*.{ts,tsx}",
              exclude: "node_modules",
            },
          }),
      ].filter(Boolean);

      config.resolve = {
        alias: {
          ...config.resolve.alias,
          // Explicitely set react's path here because npm-link doesn't do well
          // when it comes to peer dependencies, and we need to somehow develop
          // @saleor/sdk package
          react: path.resolve("./node_modules/react"),
          "react-dom": "@hot-loader/react-dom",
        },
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        plugins: [
          new TsconfigPathsPlugin({
            configFile: "./tsconfig.json",
          }),
        ],
      };

      return config;
    },
  }
);
