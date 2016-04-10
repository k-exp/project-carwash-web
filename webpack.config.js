/* global __dirname */

var path = require('path');

var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var dir_js = path.resolve(__dirname, 'src/client');
//var dir_content = path.resolve(__dirname, 'content');
var dir_build = path.resolve(__dirname, 'content');

module.exports = {
    entry: path.resolve(dir_js, 'index.js'),
    output: {
        path: dir_build,
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: dir_build,
    },
    module: {
        loaders: [
            {
                loader: 'react-hot',
                test: dir_js,
            },
            {
                loader: 'babel-loader',
                test: dir_js,
                query: {
                    presets: ['es2015', 'react'],
                },
            }
        ]
    },
    externals: {
        "jquery": "$"
    },
    plugins: [
        // Simply copies the files over
        //new CopyWebpackPlugin([
        //    { from: dir_content } // to: output.path
        //]),
        // Avoid publishing files when compilation fails
        new webpack.NoErrorsPlugin()
    ],
    stats: {
        // Nice colored output
        colors: true
    },
    // Create Sourcemaps for the bundle
    devtool: 'source-map',
};
