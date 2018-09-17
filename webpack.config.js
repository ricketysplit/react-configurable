const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './lib/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  module: {
    rules: [{ test: /\.js$/, use: 'babel-loader' }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'examples/index.html')
    })
  ],
  watch: true
};
