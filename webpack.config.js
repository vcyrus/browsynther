var webpack = require("webpack");

var package = require('./package.json');
var path = require("path");
var BUILD_DIR = path.resolve(__dirname, 'src/public');
var APP_DIR = path.resolve(__dirname, 'src/app');

module.exports = {
  mode: 'development',
  context: __dirname + "/src",
  entry: {
    index: [
        "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
        APP_DIR + '/index.js',
    ]
  },
  output: {
    path: BUILD_DIR,
    filename: 'js/bundle.js'
  },
  devServer: {
    contentBase: 'src/public',
    watchContentBase: true,
    publicPath: 'src/public/js',
    inline:true,
    hot: true,
    port: 3000,
    proxy: {
      "/api/*":{
          target:"http://localhost:5000/",
          secure:"false"
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader'
        ]
      },

    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
