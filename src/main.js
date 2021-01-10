import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
// Vue.prototype.$backendServerUrl = (Vue.config.productionTip) ? 'https://lapki-carapki-backend.herokuapp.com' : 'http://localhost:5000'

Vue.config.devtools=false

new Vue({
  router,
  components: { App },
  template: '<App/>',
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
