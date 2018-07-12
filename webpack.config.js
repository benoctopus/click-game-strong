const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Ugjs = require('uglifyjs-webpack-plugin');

const outputDirectory = 'dist'

module.exports = {
  entry: ['./src/client/index.tsx'],
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  optimization: {
    minimizer: [
      new Ugjs()
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'ts-loader',
          'tslint-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'postcss-loader',
          'css-loader',
          'sass-loader',
         ]
      },
      {
        test: /\.(jpg|png|gif|svg|pdf|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name]-[hash:8].[ext]'
            },
          },
        ]
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.ts', '.tsx']
  },
  devServer: {
    port: 3000,
    open: true,
    proxy: {
      '/api': 'http://localhost:8080'
    }
  },
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
    })
  ],
}