const merge = require('webpack-merge')

const webpackBaseConfig = require('./webpack.common.config.js')

module.exports = merge(webpackBaseConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    module: {
        rules: [
        ]
    }
})
