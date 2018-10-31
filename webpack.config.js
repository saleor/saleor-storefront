const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebappWebpackPlugin = require("webapp-webpack-plugin");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

const sourceDir = path.join(__dirname, "./src");
const distDir = path.join(__dirname, "./dist");

module.exports = (env, argv) => {
  const devMode = argv.mode !== "production";
  return {
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    entry: {
      app: `${sourceDir}/index.tsx`
    },
    output: {
      path: distDir,
      filename: devMode ? "js/[name].js" : "js/[name].[contenthash].js",
      publicPath: "/"
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader"
        },
        {
          test: /\.(scss|css)$/,
          use: [
            devMode ? "style-loader" : MiniCssExtractPlugin.loader,
            { loader: "css-loader" },
            { loader: "sass-loader" }
          ]
        },
        {
          test: /\.(woff2?|ttf|eot)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "fonts/",
                publicPath: "/fonts/"
              }
            }
          ]
        },
        {
          test: /\.(gif|jpg|png|svg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "images/",
                publicPath: "/images/"
              }
            },
            {
              loader: "image-webpack-loader",
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 85
                },
                pngquant: {
                  quality: "65-90",
                  speed: 4
                },
                gifsicle: {
                  enabled: false
                }
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin([distDir]),
      new HtmlWebpackPlugin({
        filename: `${distDir}/index.html`,
        template: `${sourceDir}/index.html`
      }),
      new MiniCssExtractPlugin({
        filename: devMode ? "[name].css" : "[name].[hash].css",
        chunkFilename: devMode ? "[id].css" : "[id].[hash].css"
      }),
      // PWA plugins
      new WebappWebpackPlugin({
        logo: `${sourceDir}/images/favicon.png`,
        prefix: "images/favicons/",
        favicons: {
          appName: "Saleor ecommerce",
          appDescription: "Store front for the Saloer ecommerce platform",
          display: "standalone",
          developerURL: null, // prevent retrieving from the nearest package.json
          background: "#ddd",
          theme_color: "#333",
          icons: {
            coast: false,
            yandex: false
          }
        }
      }),
      new SWPrecacheWebpackPlugin({
        cacheId: "saleor-store-front",
        filename: "service-worker.js",
        navigateFallback: "/index.html",
        staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
        runtimeCaching: [
          {
            urlPattern: /\/media\//,
            handler: "networkFirst"
          },
          {
            urlPattern: /\/static\//,
            handler: "networkFirst"
          }
        ]
      }),
      new webpack.EnvironmentPlugin(["npm_package_version", "BACKEND_URL"])
    ],
    node: {
      fs: "empty"
    }
  };
};
