const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        "content-script": path.resolve(__dirname, 'content-script.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    devtool: 'source-map'
}