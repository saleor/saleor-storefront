const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const createCompiler = require("@storybook/addon-docs/mdx-compiler-plugin");

module.exports = ({ config }) => {
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
    test: /stories\.mdx$/,
    use: [
      {
        loader: "babel-loader",
        // may or may not need this line depending on your app's setup
        options: {
          plugins: ["@babel/plugin-transform-react-jsx"],
        },
      },
      {
        loader: "@mdx-js/loader",
        options: {
          compilers: [createCompiler({})],
        },
      },
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
};
