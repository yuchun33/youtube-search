const path = require("path")
const webpack = require("webpack")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: {presets: ["@babel/env"]}
            },
            {
                test: /\.css/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    resolve: {
        extensions: ["*",".js","jsx"],
        alias:{
            'react-dom': '@hot-loader/react-dom'
        }
    },
    output: {
        path: path.resolve(__dirname, "dist/"),
        publicPath: "/dist/",
        filename: "bundle.js"
    },
    // optimization: {
    //     minimize: true,
    //     minimizer: [new UglifyJsPlugin()]
    // },
    devServer: {
        contentBase: path.join(__dirname, "public/"),
        port: 3006,
        publicPath: "http://localhost:3006/dist",
        hotOnly: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
}