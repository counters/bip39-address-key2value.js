const path = require('path');

module.exports = {
    mode: 'production',
    // mode: 'none',
    // mode: 'development',
    entry: {
        index: ['./index.js',],
    },
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        publicPath: 'dist/js',
    },
    devtool: "source-map"
};
