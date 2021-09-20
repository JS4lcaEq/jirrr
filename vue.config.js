module.exports = {
  publicPath: '',
  configureWebpack: {
    devtool: 'source-map'
  },
  devServer: {
    proxy: {
      "/api/": {
        target: "https://task.corp.dev.vtb/rest/",
        auth: "login:password",
        logLevel: "debug"
      }
    }
  }
}