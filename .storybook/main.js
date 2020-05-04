const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  stories: ["../src/**/stories.tsx"],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-storysource",
    "@storybook/addon-knobs",
    {
      name: "@storybook/addon-docs",
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
      },
    },
  ],

  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve("ts-loader"),
          options: {
            transpileOnly: true,
          },
        },
        {
          loader: require.resolve("react-docgen-typescript-loader"),
          options: {
            // Providing the path to tsconfig.json so that stories can
            // display types from outside each individual story.
            tsconfigPath: path.resolve(__dirname, "../tsconfig.json"),
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

    config.module.rules.push({
      test: /stories\.tsx?$/,
      loaders: [require.resolve("@storybook/addon-storysource/loader")],
      enforce: "pre",
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
        tslint: true,
        exclude: "node_modules",
      })
    );

    return config;
  },
};
