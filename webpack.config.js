const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
        new CopyWebpackPlugin({
            patterns: [
                { from: 'static' },
                {from: 'src/manifest.json'}
            ]
        })
    ]
}