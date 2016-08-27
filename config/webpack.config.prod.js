const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const ROOT = path.join(__dirname, './../');
const SRC = path.join(ROOT, 'src');
const PRESETS = ['es2015', 'stage-0', 'react', 'react-hmre'];
const PLUGINS = ['transform-decorators-legacy'];

module.exports = {
  entry: {
    'Button.js': path.join(SRC, './Button/index.js')
  },
  output: {
    // `[name]` makes sure that every key in the webpack config's `entry` becomes
    // a seperate file in the output, with the name of the file being the key name,
    // See: http://stackoverflow.com/questions/31907672/how-to-set-multiple-file-entry-and-output-in-project-with-webpack
    filename: '[name]',
    // This is where the assets are physically written on disk
    path: path.join(ROOT, './output/'),
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
    // Extracts all the styles into a single `style.css` file served at the `publicPath`
    new ExtractTextPlugin('style.css', {allChunks: true})
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
        loader: 'style!css?modules!postcss'
      }
    ],
    postcss: [autoprefixer]
  }
};
