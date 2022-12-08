const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    open:true,
    host:'localhost',
    port:8080,
    // 代理跨域
    proxy:{
      '/api':{
        target:"http://gmall-h5-api.atguigu.cn"
      }
    },
    publicPath: process.env.NODE_ENV === 'production'
    ? '/shangPingHui/'//这里写展示页面的仓库名称
    : '/',
  }
})
