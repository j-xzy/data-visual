const webpack = require('webpack');
const path = require('path');
const lazyBundle = require('./webpack.bundle');
const tsImportPluginFactory = require('ts-import-plugin');
const tscompilerOptions = require('../tsconfig.json').compilerOptions;

const frontPath = path.join(__dirname, '../FrontEnd');
const baseUrl = path.join('../', tscompilerOptions.baseUrl);
const tsPaths = tscompilerOptions.paths;


let alias = {};
for (let key in tsPaths) {
  alias[key.split('/')[0]] = path.join(
    __dirname,
    baseUrl,
    tsPaths[key][0].split('*')[0]);
}

var baseConfig = {
  entry: {
    app: path.join(frontPath, 'index.tsx')
  },
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.json', '.tsx', '.ts'],
    alias: alias
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'ts-loader',
      include: [frontPath],
      exclude: /node_modules/,
      enforce: "pre",
      options: {
        // transpileOnly: true,
        getCustomTransformers: () => ({
          before: [tsImportPluginFactory({
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: 'css'
          })]
        }),
        configFile: path.join(__dirname, '..', 'tsconfig.json')
      }
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'static/img/[name].[hash:7].[ext]'
        }
      },
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      },
    }
    ]
  }
}

baseConfig.module.rules = baseConfig.module.rules.concat(lazyBundle);

module.exports = baseConfig;