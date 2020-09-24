const path = require('path')
module.exports = {
  entry: {
    app: './src/index.ts'
  },
  output: {
    path: path.resolve(__dirname, './public')
  },
  mode: 'development',
  devtool: 'source-map',
  resolve: {
    alias: {
      vue: path.resolve(__dirname, '../vue/src/index.ts'),
      '@vue/compiler-core': path.resolve(
        __dirname,
        '../compiler-core/src/index.ts'
      ),
      '@vue/compiler-dom': path.resolve(
        __dirname,
        '../compiler-dom/src/index.ts'
      ),
      '@vue/compiler-sfc': path.resolve(
        __dirname,
        '../compiler-sfc/src/index.ts'
      ),
      '@vue/compiler-ssr': path.resolve(
        __dirname,
        '../compiler-ssr/src/index.ts'
      ),
      '@vue/reactivity': path.resolve(__dirname, '../reactivity/src/index.ts'),
      '@vue/runtime-core': path.resolve(
        __dirname,
        '../runtime-core/src/index.ts'
      ),
      '@vue/runtime-dom': path.resolve(
        __dirname,
        '../runtime-dom/src/index.ts'
      ),
      '@vue/shared': path.resolve(__dirname, '../shared/src/index.ts')
    },
    extensions: ['.js', '.ts', '.json', '.css', '.scss']
  },
  module: {
    rules: [
      {
        test: /.ts$/,
        loader: 'ts-loader'
      }
    ]
  }
}
