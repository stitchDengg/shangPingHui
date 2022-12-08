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
    // publicPath: './shangPingHui',//github仓库名
    // assetsDir: 'shangPingHui',//同上，否则访问不到静态资源
    // outputDir:"dist",
  }
})
