const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')

module.exports = {
    //入口文件 main.js
    entry: {
        main: './src/main.js'
    },
    //输出
    output: {
        // 输出到dist文件夹
        path: path.resolve(__dirname, '../dist'),
        //js 文件下
        filename: 'js/chunk-[contenthash].js',
        // 每次打包前自动清除旧的dist
        clean: true,
    },
    // 插件都放 plugins 中
    plugins: [
        new HtmlWebpackPlugin({
            //选择模板
            template: './public/index.html',
            //打包后的名字
            filename: 'index.html',
            //js文件插入到body
            inject: 'body',
        }),
        //可将css代码打包成一个单独的css文件,并插入index.html
        new MiniCssExtractPlugin({
            // 将css代码输出到dist/styles文件夹下
            filename: 'styles/chunk-[contenthash].css',
            ignoreOrder: true,
        }),
        new VueLoaderPlugin(),
        new ProgressBarPlugin({ //进度条的展示
            format: ` build [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
        })
    ],
    module: {
        rules: [
            {
                // 匹配文件后缀的规则
                test: /\.(css|s[cs]ss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader', //webpack4.x 在新版5.x中推荐使用MiniCssExtractPlugin.loader
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                // 匹配文件后缀的规则
                test: /\.(png|jpe?g|gif|svg|webp)$/,
                type: 'asset',
                parser: {
                    // 转base64的条件
                    dataUrlCondition: {
                        maxSize: 25 * 1024, // 25kb
                    }
                },
                generator: {
                    // 打包到 dist/image 文件下
                    filename: 'images/[contenthash][ext][query]',
                },
            },
            { //es6 -> es5 需要babel.config.js
                // 匹配js后缀文件
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {  // vue 和 vue-template-compiler 版本需要一致，
                test: /\.vue$/,
                use: 'vue-loader',
            }
        ]
    },
    resolve: {
        //路径别名
        alias: {
            '@': path.resolve('./src')
        },
        // 引入文件时省略后缀
        extensions: ['.js', '.ts', '.scss', '.vue'],
    }
}