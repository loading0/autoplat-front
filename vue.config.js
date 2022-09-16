const webpack = require('webpack')

module.exports = {
  lintOnSave: false,
  outputDir: "dist",
  assetsDir:"./static",
  indexPath:"index.html",
  // publicPath: "/",
  devServer: {
    host: '47.94.233.53',
    port: 8000

  },
  // devServer: {
  //   host: '47.94.233.53',
  //   // historyApiFallback: {
  //   //   index: "/index.html", // 与output的publicPath
  //   // },
  // },
  chainWebpack: config => {
    config.plugin('chunkPlugin').use(webpack.optimize.LimitChunkCountPlugin,[{
            maxChunks:5, // 必须大于或等于 1
            minChunkSize: 10000
        }])
  }
}
  // configureWebpack: {
  //   devtool: 'source-map'
  // }

// module.exports = {
//   lintOnSave: false,
//   publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
//   outputDir: "dist",
//   assetsDir:"./static",
//   indexPath:'index.html'
//   // devServer: {
//   //   overlay: {
//   //     warnings: false,
//   //     errors: false
//   //   },
//   //   // 设置主机地址
//   //   host: 'localhost',
//   //   // 设置默认端口
//   //   port: 8080,
//   //   // 设置代理
//   //   proxy: {
//   //     '/api': {
//   //       // 目标 API 地址
//   //       target: 'http://192.168.124.231:8707/', // 接口的域名
//   //       // 如果要代理 websockets
//   //       ws: false,
//   //       // 将主机标头的原点更改为目标URL
//   //       changeOrigin: true
//   //     }
//   //   }
//   // }
// }