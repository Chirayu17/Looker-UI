const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const environment = require("./environment");
const config = {
  OUTPUT_FOLDER_NAME: "public",
  OUTPUT_FILE_NAME: "main.js",
};

module.exports = {
  mode: environment.MODE,
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, config.OUTPUT_FOLDER_NAME),
    filename: config.OUTPUT_FILE_NAME,
    publicPath: "/",
  },
  target: "web",
  devServer: {
    port: environment.PORT,
    static: [`./${config.OUTPUT_FOLDER_NAME}`],
    open: true,
    hot: true,
    liveReload: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.m?js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `./${config.OUTPUT_FOLDER_NAME}/index.html`,
    }),
  ],
};
