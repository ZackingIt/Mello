const path = require('path');

module.exports = {
  context: __dirname,
  entry: './frontend/entry.jsx',
  output: {
    path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '*']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: [
            'babel-preset-es2015',
            'babel-preset-react',
            'babel-preset-stage-0',
          ],
        },
        // query: {
        //   cacheDirectory: true,
        //   plugins: ['transform-decorators-legacy' ],
        //   presets: ['es2015', 'stage-0', 'react']
        }
      }
    ]
  },
  devtool: 'source-maps'
};
