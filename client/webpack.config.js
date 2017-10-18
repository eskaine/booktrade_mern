'use strict';

const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname + '/public')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: /src/,
        loader:'babel-loader'
      },
      {
        test: /\.css$/,
        loaders:['style-loader','css-loader']
      },
      {
        test: /\.scss$/,
        loaders:['style-loader','css-loader','sass-loader']
      }
    ]
  },
  watch: true

}
