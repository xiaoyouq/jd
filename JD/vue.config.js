module.exports = {
  lintOnSave: false,
  devServer: {
    sockHost: 'demo.my-domain.com',
    disableHostCheck: true,
    proxy: {
      "/api": {
        target: "http://localhost:3002",//接口的域名
        ws: false,
        pathRewrite: {
          "^/api": ""//需要将/api重写为''
        },
        secure: false,// 如果是https接口，需要配置这个参数
        changeOrigin: true// 如果接口跨域，需要进行这个参数配置
      }
    }
  },
  pwa: {
    iconPaths: {
      favicon32: 'aqy1.ico',
      favicon16: 'aqy1.ico',
      appleTouchIcon: 'aqy1.ico',
      maskIcon: 'aqy1.ico',
      msTileImage: 'aqy1.ico'
    }
  }
}