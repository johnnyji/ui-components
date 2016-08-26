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
  entry: {
    'Button.js': path.join(SRC, 'Button/index.js'),
    'Clickable.js': path.join(SRC, 'Clickable/index.js'),
    'Input.js': path.join(SRC, 'Input/index.js'),
    'RichTextEditor.js': path.join(SRC, 'RichTextEditor/index.js'),
    'SignaturePad.js': path.join(SRC, 'SignaturePad/index.js')
  },
  output: {
    // `[name]` makes sure that every key in the webpack config's `entry` becomes
    // a seperate file in the output, with the name of the file being the key name,
    // See: http://stackoverflow.com/questions/31907672/how-to-set-multiple-file-entry-and-output-in-project-with-webpack
    filename: '[name]',
    // This is where the assets are physically written on disk
    path: path.join(ROOT, './lib/'),
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
    // Extracts all the styles into a single `style.css` file served at the `publicPath`
    new ExtractTextPlugin('style.css', {allChunks: true}),
    // Extracts all the common bits of code into a single to reduce code size,
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    // Minifies JS code
    new webpack.optimize.UglifyJsPlugin()
    // new webpack.optimize.AggresiveMergingPlugin()
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
        test: /.html$/,
        include: [SRC],
        loader: 'html'
      }, {
        test: /.scss$/,
        include: [SRC],
        loader: ExtractTextPlugin.extract('style', 'css?modules!postcss!sass')
      }, {
        test: /\.css$/,
        include: [SRC],
        loader: 'style!css?modules!postcss'
      }
    ],
    postcss: [autoprefixer],
    noParse: /\.min\.js/
    // Implement hot module reloading for SCSS and JS
  }
};
