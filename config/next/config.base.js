const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const path = require("path");

module.exports = (nextConfig = {}, { nextComposePlugins, phase }) => ({
  ...nextConfig,

  env: {
    ...nextConfig.env,
    NEXT_EXPORT: process.env.NEXT_EXPORT,
  },

  trailingSlash: true,
  productionBrowserSourceMaps: true,

  webpack: (config, options) => {
    const { isServer, dev } = options;

    config.devtool = dev ? "source-map" : "inline-source-map";

    config.node = {
      fs: "empty",
      module: "empty",
    };

    config.module.rules.push({
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
    });

    if (!isServer) {
      config.plugins.push(
        new ForkTsCheckerWebpackPlugin({
          typescript: {
            mode: "write-references",
          },
          eslint: {
            files: "./src/**/*.{ts,tsx}",
            exclude: "node_modules",
          },
        })
      );
    }

    config.resolve = {
      alias: {
        ...config.resolve.alias,
        "@babel/runtime": path.resolve(
          "./node_modules/next/node_modules/@babel/runtime/"
        ),
        "react-is": path.resolve("./node_modules/next/node_modules/react-is/"),
        "strip-ansi": path.resolve(
          "./node_modules/next/dist/compiled/strip-ansi/"
        ),
        "prop-types": path.resolve("./node_modules/prop-types/"),
        "tiny-warning": path.resolve("./node_modules/tiny-warning/"),
        "memoize-one": path.resolve("./node_modules/memoize-one/"),
        "query-string": path.resolve("./node_modules/query-string/"),
        "hoist-non-react-statics": path.resolve(
          "./node_modules/hoist-non-react-statics/"
        ),
        "strict-uri-encode": path.resolve(
          "./node_modules/query-string/node_modules/strict-uri-encode/"
        ),
        "@emotion/memoize": path.resolve(
          "./node_modules/styled-components/node_modules/@emotion/memoize/"
        ),
        "@emotion/unitless": path.resolve(
          "./node_modules/styled-components/node_modules/@emotion/unitless/"
        ),
        tslib: path.resolve(
          "./node_modules/@apollo/react-components/node_modules/tslib/"
        ),
        // Explicitly set react's path here because npm-link doesn't do well
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

    return typeof nextConfig.webpack === "function"
      ? nextConfig.webpack(config, options)
      : config;
  },
});
