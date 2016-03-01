var path = require("path")
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');

const paths = {
  angular: path.resolve(__dirname, 'node_modules/angular/angular.min.js')
};

module.exports = {
  context: __dirname,

  entry: './public/index.js',

  output: {
      path: path.resolve('./build/'),
      filename: "[name]-[hash].js",
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name]-[hash].css'),
    new HtmlWebpackPlugin({
      title: 'Testing',
      template: path.join(__dirname, 'public/index.html'),
      inject: 'body'
    }),
    new webpack.DefinePlugin({
      __API_URL__: JSON.stringify(process.env.API_URL || 'https://goatspresso.herokuapp.com'),
    }),
  ],

  module: {
    resolve: {
      alias: {
        'angular': paths.angular
      }
    },
    loaders: [
      {
        // to transform JSX into JS
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: ['babel']
      },
      {
        test: /\.json/,
        loaders: ['json-loader']
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract(
          'css!' +
          'postcss!' +
          'sass?sourceMap'
        )
      }
    ],
    noParse: [
      paths.angular
    ]
  },

  postcss: function() {
    return [
      autoprefixer({
        browsers: ['ios >= 7']
      })
    ];
  },

  devtool: 'inline-source-map',

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js']
  },

  watchOptions: {
    poll: true,
    polling: 1000
  }
}
