const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const ROOT = path.join(__dirname, './../');
const SRC = path.join(ROOT, 'src');
const PRESETS = ['es2015', 'stage-0', 'react'];
const PLUGINS = ['transform-decorators-legacy'];

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: path.join(SRC, './index.js'),
  output: {
    // This is where the assets are physically written on disk
    filename: 'bundle.js',
    path: path.join(ROOT, './dist/')
  },
  resolve: {
    extensions: ['', '.js', '.json', '.scss']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    // Deduplicates dependency trees
    new webpack.optimize.DedupePlugin(),
    // Extracts all css in one file
    new ExtractTextPlugin('style.css', {allChunks: true}),
    // Minifies JS
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /.js$/,
        include: [SRC],
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: PRESETS,
          plugins: PLUGINS
        }
      }, {
        test: /.scss$/,
        include: [SRC],
        loader: ExtractTextPlugin.extract('style', 'css?modules!postcss!sass')
      }, {
        test: /\.css$/,
        include: [SRC],
        loader: ExtractTextPlugin.extract('style', 'css?modules!postcss')
      }
    ],
    postcss: [autoprefixer]
  }
};
