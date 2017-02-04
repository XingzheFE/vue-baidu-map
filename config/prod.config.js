let path = require("path");
let webpack = require("webpack");
let projectRoot = path.resolve(__dirname, "../");

let config = {
    entry: "./example/index.js",
    watch: true,
    output: {
        path: "/dist/",
        filename: "index.js"
    },
    devtool: "eval-source-map",
    // resolve: {
    //     alias: {
    //         "static": path.resolve(__dirname, "../../static"),
    //         "components": path.resolve(__dirname, "../../build/components"),
    //         "node_modules": path.resolve(__dirname, "../../node_modules")
    //     }
    // },
    // resolveLoader: {
    //     fallback: [path.join(__dirname, "../node_modules")]
    // },
    devServer: {
        contentBase: path.join(__dirname, "../dist"),
        compress: true,
        hot: true,
        inline: true,
        port: 8080
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [/node_modules/]
            },
            {
                test: /\.es6$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: ["style-loader", "css-loader"]
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(ico|jpg|png|gif|svg|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
                loader: 'file-loader'
            }
        ]
    },
    target: "web",
    plugins: [
        // 错误不中断程序运行
        new webpack.NoEmitOnErrorsPlugin(),
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
