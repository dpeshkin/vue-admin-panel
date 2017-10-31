var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: {
    js: './src/main.js',
    styles: './src/stylesheets/index.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: '[name].build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: [
              'vue-style-loader',
              'css-loader',
              'svg-fill-loader/encodeSharp',
              'sass-loader',
              {
                loader: 'sass-resources-loader',
                options: {
                  resources: [
                    './src/stylesheets/variables.scss',
                    './src/stylesheets/mixins.scss'
                  ]
                }
              }
            ],
          },
          // other vue-loader options go here
          esModule: false, // необходимо чтобы убрать ошибку Vue Failed to mount component: template or render function not defined
          
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader', 
          'css-loader', 
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gifza)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.svg$/,
        use: [
          'url-loader',
          {
            loader: 'svg-fill-loader?fill=#fff'
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'img': path.resolve(__dirname, './src/assets/img')
    },
    extensions: ['.js', '.vue'] // пропишем расширения, чтобы пути до файлов сделать короче
  },
  devServer: {
    historyApiFallback: true,
    noInfo: false,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
