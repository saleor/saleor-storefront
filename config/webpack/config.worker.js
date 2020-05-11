const path = require("path");
const WorkboxPlugin = require("workbox-webpack-plugin");
const webpack = require("webpack");

module.exports = ({ sourceDir, distDir }) => ({
  plugins: [
    new WorkboxPlugin.InjectManifest({
      swSrc: `${sourceDir}/sw.js`,
      swDest: path.join(distDir, "./service-worker.js"),
      exclude: [
        /\.map$/,
        /^manifest.*\.js(?:on)?$/,
        /\.js.map$/,
        /\.css.map/,
        /\.xls$/,
      ],
    }),
    new webpack.EnvironmentPlugin({
      SERVICE_WORKER_EXISTS: true,
      SERVICE_WORKER_TIMEOUT: "60000",
    }),
  ],
});
