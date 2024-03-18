// webpack.config.js

const path = require("path");

module.exports = {
  entry: "./src/index.js", // Example entry point
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      // Example loader configuration
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  resolve: {
    fallback: {
      crypto: require.resolve("crypto-browserify"),
    },
  },
  // Other existing webpack configuration settings...
};
