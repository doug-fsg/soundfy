module.exports = {
    configureWebpack: {
      devServer: {
        watchOptions: {
          ignored: /public\/storage/
        }
      }
    }
  }
  