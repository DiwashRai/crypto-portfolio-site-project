const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      REACT_APP_API_URL: JSON.stringify(
        'https://diwashrai-crypto-backend.herokuapp.com'
        // 'http://62.30.13.3:3000'
        // 'http://localhost:3000'
      ),
    }),
  ],
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    static: path.join(__dirname, 'public'),
    historyApiFallback: true,
  },
};
