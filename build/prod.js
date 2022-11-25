const { merge } = require('webpack-merge')
const base = require('./base')
const webpack = require('webpack')

module.exports = merge(base, {
    mode: 'production',
    devServer: {
        open: true,
        // hot: true,
    },
    /**
 * source-map 的作用：代码报错时，能快速定位到出错位置
 * development ：使用 eval-cheap-module-source-map 模式，能具体定位到源码位置和源码展示，适合开发模 式，体积较小
 * production ：使用 nosources-source-map ，只能定位源码位置，不能源码展示，体积较小，适合生产模式
 */
    devtool: 'nosources-source-map',
    plugins: [
        new webpack.DefinePlugin({
            process: {
                env: {
                    NODE_DEV: JSON.stringify('prodction'),
                    // 这里可以定义你的环境变量
                    // VUE_APP_URL: JSON.stringify('https://xxx.com')
                },
            },
        }),
    ],
})