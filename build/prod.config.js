let path =  require('path');
let webpack = require('webpack');
let utils = require('./utils.js')
let HtmlWebpackPlugin = require('html-webpack-plugin');
let projectRoot = path.resolve(__dirname, '../');
let CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

let config = {
    entry: {
        roadbook: './build/entry/roadbook.js',
        createRoadbook: "./build/entry/createRoadbook.js",
        myRoadbook: "./build/entry/myRoadbook.js",
        showRoadbook: "./build/entry/showRoadbook.js",
        uploadgpx: "./build/entry/uploadgpx.js",
        collectionDetails: "./build/entry/collectionDetails.js"
    },
    output: {
        path: './static/dist/js/roadbook',
        publicPath: "/static/dist/js/roadbook/",
        filename: "[name].entry.chunk.js"
    },
    devtool: false,                 // do not use source map in production
    resolve: {
        alias: {
            'static': path.resolve(__dirname, '../../static'),
            'components': path.resolve(__dirname, '../../build/components'),
            'node_modules': path.resolve(__dirname, '../../node_modules')
        }
    },
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader?presets[]=es2015',
                include: projectRoot,
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=25000'
            }
        ]
    },
    vue: {
        loaders: utils.cssLoaders()
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "首页",
            filename: path.resolve(__dirname, "../../templates/lushu/lushu.html"),
            template: "build/templates/roadbook/lushu.html",
            chunks: [ "commons.chunk.js", "roadbook"],
            inject: "body",
            hash: true,
            chunksSortMode: 'dependency',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),
        // 错误不中断程序运行
        new webpack.NoErrorsPlugin(),
        // 打包公共模块
        new webpack.optimize.CommonsChunkPlugin("commons.chunk.js", ["roadbook", "createRoadbook", "showRoadbook", "uploadgpx", "collectionDetails", "myRoadbook"]),
        // new webpack.optimize.CommonsChunkPlugin("map.chunk.js", ["createRoadbook", "showRoadbook"]),

        // 代码压缩
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.BannerPlugin('This file is created by xingzheFE\n' + new Date())
    ]
};

module.exports = config;
