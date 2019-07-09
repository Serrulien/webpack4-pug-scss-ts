const merge = require('webpack-merge');

const webpackBaseConfig = require('./webpack.common.config.js');

const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(webpackBaseConfig, {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        moduleIds: 'hashed',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        },
        minimizer:
        [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                cache: true,
                parallel: true, // os.cpus().length - 1
                sourceMap: true,
                terserOptions: {
                    ecma: undefined,
                    warnings: false,
                    parse: {},
                    compress: {},
                    mangle: true, // Note `mangle.properties` is `false` by default.
                    module: false,
                    output: null,     
                    toplevel: false,
                    nameCache: null,
                    ie8: false,
                    keep_classnames: undefined,
                    keep_fnames: false,
                    safari10: false,
                    output: {
                        comments: /@license/i,   
                    }
                },
                extractComments: {
                    condition: /^\**!|@preserve|@license|@cc_on/i,
                    filename: 'extracted-comments.js',
                    banner: (licenseFile) => {
                      return `License information can be found in ${licenseFile}`;
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin()
        ]
    }
});
