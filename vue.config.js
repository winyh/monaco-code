const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin({
        languages: ['javascript', 'css', 'html', 'typescript', 'json', 'xml'],
      }),
    ],
  },
};
