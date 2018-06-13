var webpackConfig = require('./webpack.config.js');
delete webpackConfig.entry;

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        reporters: ['progress'],
        port: 9876,
        colors: false,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        autoWatchBatchDelay: 300,

        files: [
            './src/**/*.spec.js'
        ],

        preprocessors: {
            './src/**/*.spec.js': ['webpack']
        },

        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true
        }
    })
}