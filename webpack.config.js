const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js',
    clean: true,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
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
        test: /\.(jpe?g|png|svg)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 25000,
          },
        }],
        generator: {
          filename: './assets/images/[name][ext]',
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot)$/i,
        type: 'asset/resource',
        generator: {
          filename: './assets/fonts/[name][ext]',
        },
      },
    ]
  },
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@buttons': path.resolve(__dirname, 'src/components/utilities/buttons'),
      '@modals': path.resolve(__dirname, 'src/components/utilities/modals'),
      '@modules': path.resolve(__dirname, 'src/modules')
    },
  },
}