const prodConfig = require('./webpack.prod');
const path = require('path');

prodConfig.output.publicPath = './';
prodConfig.output.path = path.join(__dirname, '..', 'site');

module.exports = prodConfig;