var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var PACKAGE = require('./package.json');

var banner = `
${PACKAGE.name} v${PACKAGE.version}
(C) 2020 ${new Date().getUTCFullYear() !== 2020 ? '- present, ' : ''}${PACKAGE.author}
${PACKAGE.license} (SEE LICENSE)
${PACKAGE.homepage}
`; // thanks dreyescat@stackoverflow


var babelOptions = {
  "presets": ["@babel/preset-env"]
};

module.exports = (_env, argv) => {
  const mode = argv.mode ? argv.mode : 'production';

  const config = {
    mode: mode,
    entry: './src/index.ts',
    target: 'node',
    node: {
      __filename: false,
      __dirname: false
    },
    output: {
      // path: __dirname + '/build',
      filename: 'bundle.js',
      libraryExport: 'default',
      libraryTarget: 'commonjs2'
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    externals: [nodeExternals()],
    module: {
      rules: [{
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: mode === 'development'
            }
          }
        ]
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions
          }
        ]
      }]
    },
    plugins: [
      new webpack.BannerPlugin(banner)
    ]
  };

  return config;
};