const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  stories: ["../src/@next/**/stories.tsx"],
  addons: [
    {
      name: "@storybook/addon-essentials",
    },
  ],

  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "babel-loader",
          options: {
            configFile: "./babel.config.js",
          },
        },
      ],
    });

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

    config.resolve.extensions.push(".ts", ".tsx");
    config.resolve.plugins = [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, "../tsconfig.json"),
      }),
    ];

    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.resolve("./"),
    ];

    config.plugins.push(
      new ForkTsCheckerWebpackPlugin({
        typescript: true,
        eslint: {
          files: "./src/**/*.{ts,tsx}",
          exclude: "node_modules",
        },
      })
    );

    return config;
  },
};
