var webpack = require("webpack");
var Extract = require("extract-text-webpack-plugin");

var DEV = process.env.BUILD_DEV;

var pack = {
  entry: "./index.js",

  output: {
    path: "./static/",
    filename: "app.js"
  },

  resolve: {
    modulesDirectories: ["node_modules", "src", "components"]
  },

  module: {
    loaders: [
      { test: /\.js$/, loaders: ["babel?stage=1"]},
      { test: /\.css$/, loader: Extract.extract("style-loader", "css-loader?importLoaders=1!postcss-loader") }
    ]
  },

  postcss: [
    require("autoprefixer-core"),
    require("postcss-nested"),
    require("postcss-simple-vars"),
    require("postcss-media-minmax")
  ],

  plugins: [
    new Extract("app.css", { allChunks: true })
  ]
}

if (DEV) {
  pack.devtool = "eval-source-map";
}

module.exports = pack;
