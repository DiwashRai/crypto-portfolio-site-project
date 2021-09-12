const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  const isProduction = env.production;
  const CSSExtract = new MiniCssExtractPlugin({ filename: 'styles.css' });

  console.log('env', env);
  return {
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public', 'dist'),
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
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      CSSExtract,
      new webpack.DefinePlugin({
        REACT_APP_API_URL: JSON.stringify(
          //'https://diwashrai-crypto-backend.herokuapp.com'
          // 'http://62.30.13.3:3000'
          'http://localhost:3000'
        ),
      }),
    ],
    devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',
    devServer: {
      static: path.join(__dirname, 'public'),
      historyApiFallback: true,
      devMiddleware: {
        publicPath: '/dist/',
      },
    },
  };
};
