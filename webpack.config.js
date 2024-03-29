const path = require("path");
const Dotenv = require("dotenv-webpack");
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
  entry: "./src/client/index.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js"
  },
  watch: true,
  devtool: 'eval-cheap-source-map',
  watchOptions: { ignored: /node_modules/ },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, //keeping react files around, but we're not going to use them for now
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(css)$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      }
    ]
  },
  resolve: {
    alias: {
      Util: path.resolve(__dirname, "src/client/Util/"),
      css: path.resolve(__dirname, "src/client/css/")
    }
  },
  plugins: [new Dotenv(), new MomentLocalesPlugin()]
};
