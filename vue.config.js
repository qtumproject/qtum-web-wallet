const path = require('path')

module.exports = {
    transpileDependencies: ['vue-clamp', 'resize-detector'],
    chainWebpack: config => {
        config.resolve.alias.set('@', path.resolve(__dirname, './src'))
        config.optimization.minimizer('terser').tap((args) => {
            args[0].terserOptions.mangle.keep_fnames = true
            return args
        })
        config.module
            .rule('js')
            .use('babel-loader')
            .tap(options => {
                // 修改它的选项...
                return {
                    ...options,
                    include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'test'), path.resolve(__dirname, 'node_modules/bech32')]
                }
            })
    },
    configureWebpack: () => {
        return {
            devServer: {
                disableHostCheck: true
            }
        }
    }
}
