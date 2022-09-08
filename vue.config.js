module.exports = {
  productionSourceMap: false,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {// 匹配所有以 '/api'开头的请求路径
        target: 'http://gmall-h5-api.atguigu.cn',// 代理目标的基础路径
        changeOrigin: true,
        // pathRewrite: {'^/api': ''}
      },
    }
  }
}