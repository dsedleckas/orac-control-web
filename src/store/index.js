import Vue from 'vue'
import Vuex from 'vuex'
import 'es6-promise/auto'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    wsConnected: false,
    oracConnected: false
  },
  mutations: {
    SET_WS_CONNECTED: (state, status) => {
      state.wsConnected = status
    },
    SET_ORAC_CONNECTED: (state, status) => {
      state.oracConnected = status
    }
  },
  actions: {
    socket_connect: (context) => {
      context.commit('SET_WS_CONNECTED', true)
      this.a._vm.$socket.emit('/Connect')
    },
    socket_oracConnected: (context) => {
      context.commit('SET_ORAC_CONNECTED', true)
    }
  },
  getters: {
    wsConnected: state => {
      return state.wsConnected
    },
    oracConnected: state => {
      return state.oracConnected
    }
  }
})

export default store
