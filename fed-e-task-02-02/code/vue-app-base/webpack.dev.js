const { merge } = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: [
      './public',
      './src/assets'
    ],
    hotOnly: true,
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});