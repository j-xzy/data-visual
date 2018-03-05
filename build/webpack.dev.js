const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

baseConfig.entry.app = [path.join(__dirname, 'auto-reload.js')]
  .concat(baseConfig.entry.app);

module.exports = merge(baseConfig, {
  devtool: 'cheap-module-source-map',
  mode: 'development',
  module: {
    rules: [{
      test: /\.tsx$/,
      enforce: 'pre',
      loader: 'tslint-loader',
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    },
    {
      test: /\.styl$/,
      use: [
        'style-loader',
        'css-loader',
        'stylus-loader'
      ]
    }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../FrontEnd', 'index.html'),
      inject: true
    })
  ]
});