module.exports = {
  devServer: {
    host: 'localhost'
  },
  chainWebpack: config => {
    config.plugins.delete('pwa');
    config.plugins.delete('workbox');
  }

  // 'transpileDependencies': [
  //   'vuetify'
  // ]
}
