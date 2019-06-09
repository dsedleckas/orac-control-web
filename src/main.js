// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueSocketIO from 'vue-socket.io'
import store from './store/index'

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:3000/'
}))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
