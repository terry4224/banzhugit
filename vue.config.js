const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
      host: '0.0.0.0',
    // https:true,
      port: 6103,
      client: {
        webSocketURL: 'ws://0.0.0.0:6103/ws',
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
  },
  // devServer:{
  //   proxy: {
  //     // 代理请求， 匹配所有以/api开头的请求
  //     '/api': {
  //       // 目标服务器，所有以/api开头的请求接口代理到目标服务器
  //       target: 'https://autumnfish.cn',
  //       // 重写路径，此时用于匹配反向代理的/api可以替换为空
  //       pathRewrite: { '/api': '' },
  //       // 如果代理到HTTPS服务器需要设置secure为true，默认为false
  //       secure: true,
  //       ws:false
  //     }
  //   }
  // }
//   settings: {
//     "vetur.useWorkspaceDependencies": true,
//     "vetur.experimental.templateInterpolationService": true
// },
})
