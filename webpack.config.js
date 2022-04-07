const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const GenerateJsonFromJsPlugin = require('generate-json-from-js-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: {
        "content-script": path.resolve(__dirname, 'src/content-script.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        // filename: '[name].bundle.js'
    },
    devtool: 'source-map',
    plugins: [
        // copy static files to dist folder
        new CopyWebpackPlugin({
            patterns: [
                { from: 'static' },
                // {from: 'src/manifest.json'}
            ]
        }),
        // transform manifest.js to manifest.json
        new GenerateJsonFromJsPlugin({
            path: 'src/manifest.js',
            filename: 'manifest.json'
          })
    ]
}