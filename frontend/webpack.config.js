const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    static: path.join(__dirname, 'public'), // можно, чтобы раздавал favicon и т.п.
    historyApiFallback: true,
    port: 3000
  },
  module: {
    rules: [
      // JS/JSX
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env', '@babel/preset-react'] }
        }
      },
      // CSS
      {
        test: /\.css$/i,
        use: [
          'style-loader', // в dev вставляет <style> в DOM
          'css-loader'    // парсит импорты и url() внутри CSS
        ]
      },
      // (опционально) ассеты — картинки/шрифты, если понадобятся из CSS/JS
      // { test: /\.(png|jpe?g|gif|svg|woff2?|ttf|eot)$/i, type: 'asset' }
    ]
  },
  plugins: [new HtmlWebpackPlugin({ template: './public/index.html' })],
  resolve: { extensions: ['.js', '.jsx'] }
};
