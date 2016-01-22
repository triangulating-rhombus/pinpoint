// Cloned from Pete Hunt's React Webpack Template repo
// https://github.com/petehunt/react-webpack-template

module.exports = {
  cache: true,
  entry: './index',
  output: {
    filename: 'browser-bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
    ]
  }
};