const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VENDOR_LIBS = [
    'react',
    'react-dom',
    'react-redux',
    'redux',
    'react-bootstrap',
    'lodash',
    'classnames',
    'prop-types'
];

module.exports = {
    entry: {
        bundle : path.join(__dirname,'/src/index.js'),
        vendor: VENDOR_LIBS
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[hash].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
    ],
    resolve: {
        modules: [
            path.resolve('./node_modules')
        ]
    }
};
