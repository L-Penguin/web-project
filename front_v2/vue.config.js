module.exports = {
    pages: {
        index: {
            // 入口
            entry: 'src/main.js',
        }
    },
    // 关闭语法检查
    lintOnSave: false,
    // 开启代理服务器（方式一）
    devServer: {
        proxy: "http://localhost:3000"
    }
    // 开启代理服务器（方式二）
    // devServer: {
    //     proxy: {
    //         '/api1': {
    //             target: 'http://localhost:5000',
    //             pathRewrite: {
    //                 '^/api1' : ''
    //             },
    //             // ws: true, // 用于支持websocket
    //             // changeOrigin: true // 用于控制请求头中的host值
    //         },
    //         '/api2': {
    //             target: 'http://localhost:5001',
    //             pathRewrite: {
    //                 '^/api2' : ''
    //             },
    //         }
    //     }
    // }
}