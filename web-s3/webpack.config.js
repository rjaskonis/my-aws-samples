const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const node_modulesPath = path.resolve(__dirname, "node_modules");
const srcPath = path.resolve(__dirname, "src");
const jsPath = path.resolve(srcPath, "js");
const publicPath = path.resolve(__dirname, "dist");

module.exports = {
    mode: "development",
    devServer: {
        contentBase: publicPath,
        writeToDisk: true,
        compress: true,
        clientLogLevel: "silent",
        // quiet: true,
        // noInfo: true,
        port: 3333,
        hot: true,
        open: false,
    },
    entry: {
        // sv: [
        //     "react",
        //     "react-dom",
        //     "react-router-dom",
        //     "@hot-loader/react-dom",
        //     "react-router",
        //     "axios",
        //     "dayjs",
        // ],
        sa: [path.join(jsPath, "index.ts")],
    },
    output: {
        filename: "[name].js",
        path: path.join(publicPath, "js"),
        publicPath,
    },
    plugins: [
        new HtmlWebpackPlugin({
            minify: true,
            template: path.join(srcPath, "index.html"),
            filename: "../index.html",
            inject: false,
            publicPath,
        }),
        // new webpack.DefinePlugin({
        //     "process.env": { NODE_ENV: JSON.stringify("production") },
        // }),
        new CleanWebpackPlugin({ root: jsPath }),
    ],
    module: {
        rules: [{ test: /\.ts$/, exclude: /node_modules/, use: "ts-loader" }],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
};
