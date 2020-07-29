const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    publicPath: '',
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   loader: 'babel-loader',
      //   options: {
      //     presets: ['@babel/preset-env'],
      //   },
      //   exclude: file => (
      //     /node_modules/.test(file) &&
      //     !/\.vue\.js/.test(file)
      //   )
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          transformAssetUrls: {
            video: ['src', 'poster'],
            source: 'src',
            img: 'src',
            image: ['xlink:href', 'href'],
            use: ['xlink:href', 'href']
          },
        },
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          }
        ]
      },
      
      {
        test: /\.png$/,
        loader: 'url-loader',
        options: {
          limit: 10 * 1024
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'vue-app-base',
      filename: 'index.html',
      template: './public/index.html',
    }),
    new webpack.DefinePlugin({
      BASE_URL: JSON.stringify('./'),
    }),
  ],
};