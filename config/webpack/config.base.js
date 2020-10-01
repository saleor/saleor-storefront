const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebappWebpackPlugin = require("webapp-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

if (!process.env.API_URI) {
  throw new Error("Environment variable API_URI not set");
}
const STATIC_URL = process.env.STATIC_URL || "/";

module.exports = ({ sourceDir, distDir }) => ({
  devtool: "source-map",
  entry: {
    app: `${sourceDir}/index.tsx`,
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: "ts-loader",
        options: {
          experimentalWatchApi: true,
          transpileOnly: true,
        },
        test: /\.tsx?$/,
      },
      {
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          configFile: "./babel.config.js",
        },
        test: /\.(jsx?|tsx?)$/,
      },
      {
        test: /\.(woff2?|ttf|eot)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
              publicPath: "/fonts/",
            },
          },
        ],
      },
      {
        test: /\.(gif|jpg|png|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images/",
              publicPath: "/images/",
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              gifsicle: {
                enabled: false,
              },
              mozjpeg: {
                progressive: true,
                quality: 85,
              },
              pngquant: {
                quality: "65-90",
                speed: 4,
              },
            },
          },
        ],
      },
    ],
  },
  node: {
    fs: "empty",
    module: "empty",
  },
  output: {
    path: distDir,
    publicPath: STATIC_URL,
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: distDir,
    }),
    new HtmlWebpackPlugin({
      API_URI: process.env.API_URI,
      filename: `${distDir}/index.html`,
      template: `${sourceDir}/index.html`,
    }),
    new ForkTsCheckerWebpackPlugin({
      eslint: true,
      exclude: "node_modules",
    }),
    // PWA plugins
    new WebappWebpackPlugin({
      favicons: {
        appDescription: "Storefront for the Saleor e-commerce platform",
        appName: "Saleor",
        background: "#ddd",
        developerURL: null, // prevent retrieving from the nearest package.json
        display: "standalone",
        theme_color: "#333",
      },
      logo: `${sourceDir}/images/favicon.png`,
      prefix: "images/favicons/",
    }),
    new webpack.EnvironmentPlugin({
      API_URI: "http://localhost:8000/graphql/",
      DEMO_MODE: false,
      GTM_ID: undefined,
      SENTRY_APM: "0",
      SENTRY_DSN: null,
    }),
  ],
  resolve: {
    alias: {
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
  },
});
