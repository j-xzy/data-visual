const prodConfig = require('./webpack.prod');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

prodConfig.output.publicPath = './';
prodConfig.output.path = path.join(__dirname, '..', 'site');
prodConfig.plugins.push(
  new CleanWebpackPlugin(['site/*'], {
    root: path.join(__dirname, '..')
  }));

module.exports = prodConfig;