const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (nextConfig = {}, { nextComposePlugins, phase }) => ({
  ...nextConfig,

  webpack: (config, options) => {
    config.module.rules = [
      ...config.module.rules,
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: true },
          },
          "sass-loader",
        ],
      },
    ];

    config.plugins = [
      ...config.plugins,
      new MiniCssExtractPlugin({
        filename: "[name].[hash].css",
        chunkFilename: "[id].[hash].css",
      }),
    ];

    return typeof nextConfig.webpack === "function"
      ? nextConfig.webpack(config, options)
      : config;
  },
});
