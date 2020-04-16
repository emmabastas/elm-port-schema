const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = (env, argv) => {
  return {
    entry: './src/index.ts',
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: 'ts-loader',
        },
        {
          test: /\.elm$/,
          exclude: [/elm-stuff/, /node_modules/],
          use: {
            loader: 'elm-webpack-loader',
            options: {
              optimize: argv.mode !== "development"
            }
          }
        }
      ],
    },
    resolve: {
      extensions: [ '.ts', '.js', '.elm' ],
    },
    target: 'node',
    externals: [nodeExternals()],
    output: {
      filename: 'elm-port-schema.js',
      path: path.resolve(__dirname, 'lib'),
    },
  };
}
