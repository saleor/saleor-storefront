const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const path = require("path");

module.exports = (nextConfig = {}, { nextComposePlugins, phase }) => ({
  ...nextConfig,

  trailingSlash: true,

  webpack: (config, options) => {
    const { isServer, dev } = options;

    config.devtool = dev ? "source-map" : "inline-source-map";

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
    ].filter(Boolean);

    config.plugins = [
      ...config.plugins,

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
