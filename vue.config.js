const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const isPro = process.env.NODE_ENV == 'production';

module.exports = {
  productionSourceMap: isPro ? false : true,
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin({
        languages: ['javascript', 'css', 'html', 'typescript', 'json', 'xml'],
      }),
    ],
  },
};
