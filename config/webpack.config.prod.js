/* eslint-disable prefer-template */
const autoprefixer = require('autoprefixer');
const components = require('../src/components');
const path = require('path');
const webpack = require('webpack');

const ROOT = path.join(__dirname, './../');
const SRC = path.join(ROOT, 'src');
const PRESETS = ['es2015', 'stage-0', 'react'];
const PLUGINS = ['transform-decorators-legacy'];

// Entry points for every component
const COMPONENTS_ENTRY = components.reduce((accum, component) => {
  const entryPath = {};
  entryPath[component + '.js'] = path.join(SRC, './' + component + '/index.js');
  return Object.assign({}, accum, entryPath);
}, {});

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: COMPONENTS_ENTRY,
  output: {
    // `[name]` makes sure that every key in the webpack config's `entry` becomes
    // a seperate file in the output, with the name of the file being the key name,
    // See: http://stackoverflow.com/questions/31907672/how-to-set-multiple-file-entry-and-output-in-project-with-webpack
    filename: '[name]',
    // This is where the assets are physically written on disk
    path: path.join(ROOT, './build/'),
    library: 'ui-components',
    libraryTarget: 'umd',
    externals: {
      'react': 'react',
      'react-dom': 'react-dom'
    }
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
    // Deduplications dependency trees
    new webpack.optimize.DedupePlugin(),
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
        loader: 'style!css?modules!postcss!sass'
      }, {
        test: /\.css$/,
        include: [SRC],
        loader: 'style!css?modules!postcss'
      }
    ],
  },

  postcss: [autoprefixer]
};
/* eslint-enable prefer-template */
