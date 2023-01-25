const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js'
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html',
      title: 'The CV',
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpe?g|png|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 25000,
            filename: '[name].[ext]',
            outputPath: 'assets/images/'
          },
        }]
      },
      {
        test: /\.(woff2?)$/i,
        exclude: /node_modules/,
        type: 'asset/resource',
        generator: {
          filename: '[name].[ext]',
          outputPath: 'assets/fonts/'
        }
      }
    ]
  }
}