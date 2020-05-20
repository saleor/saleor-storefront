const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const STATIC_URL = process.env.STATIC_URL || '/';


module.exports = ({ sourceDir, distDir }) => ({
  output: {
    filename: "js/[name].[contenthash].js",
    publicPath: STATIC_URL,
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: true }
          },
          { loader: "sass-loader" }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css"
    })
  ]
});
