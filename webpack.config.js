var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: path.join(__dirname),
  entry: "./src/SlackMessagePreview.js",

  output: {
    path: path.join(__dirname, "./dist/"),
    filename: "index.js",
    library: "slack-message-preview",
    libraryTarget: "umd"
  },

  externals: {
    "react": "react",
    "react-dom": "react-dom"
  },

  plugins: [
    new webpack.DefinePlugin({
      // To force React into knowing this is a production build.
      "process.env": { NODE_ENV: JSON.stringify("production") }
    }),
    new ExtractTextPlugin("index.css", { allChunks: true }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: { unused: true, dead_code: true, warnings: false }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel",
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ["es2015", "react"]
        }
      },
      {
        test: /\.scss$/,
        loaders: [
          'isomorphic-style-loader',
          `css-loader?${JSON.stringify({
            sourceMap: false,
            modules: true,
            localIdentName: '[hash:base64:3]',
            minimize: true,
          })}`,
          'postcss-loader?parser=postcss-scss'
        ]
      },
      {
        test: /\.woff$/,
        loader: "url-loader"
      }
    ]
  }
};
