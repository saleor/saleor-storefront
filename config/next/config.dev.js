const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = (nextConfig = {}, { nextComposePlugins, phase }) => {
  const optimize = process.env.OPTIMIZE === "true";

  return {
    ...nextConfig,

    webpack: (config, options) => {
      const { isServer } = options;

      config.module.rules = [
        ...config.module.rules,
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
      ];

      config.plugins.push(
        new MiniCssExtractPlugin({
          filename: "[name].css",
          chunkFilename: "[id].css",
        })
      );

      if (optimize) {
        config.plugins.push(
          new DuplicatePackageCheckerPlugin(),
          new BundleAnalyzerPlugin({
            analyzerMode: "server",
            analyzerPort: isServer ? 8888 : 8889,
            openAnalyzer: true,
          })
        );
      }

      return typeof nextConfig.webpack === "function"
        ? nextConfig.webpack(config, options)
        : config;
    },
  };
};
