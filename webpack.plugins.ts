import type IForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

// Webpack.
const webpack = require('webpack');

// Copy statics
const CopyWebpackPlugin = require('copy-webpack-plugin');
import * as path from 'path';

const assets = ['icons'];
const copyPlugins = assets.map(asset => {
  return new CopyWebpackPlugin({
    patterns: [
    {
      from: path.resolve(__dirname, 'src/assets', asset),
      to: path.resolve(__dirname, '.webpack/renderer', asset)
    }
  ]});
});

// Use Jquery.
const jQueryPlugin = new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery'
})


// Export Plugins
export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: 'webpack-infrastructure',
  })
].concat(copyPlugins, jQueryPlugin);
