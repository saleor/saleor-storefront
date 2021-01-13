const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (nextConfig = {}, { nextComposePlugins, phase }) => ({
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

    config.plugins = [
      ...config.plugins,
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
      }),
    ];

    return typeof nextConfig.webpack === "function"
      ? nextConfig.webpack(config, options)
      : config;
  },
});
