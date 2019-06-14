// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueSocketIO from 'vue-socket.io'
import store from './store/index'

Vue.use(new VueSocketIO({
  debug: false,
  // config/dev.env.js
  connection: (process.env.WS_URL) ? process.env.WS_URL : 'http://' + window.location.host,
  vuex: {
    store,
    actionPrefix: 'socket_',
    mutationPrefix: 'SOCKET_'
  }
}))

Vue.config.productionTip = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
