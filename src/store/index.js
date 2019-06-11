import Vue from 'vue'
import Vuex from 'vuex'
import 'es6-promise/auto'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    wsConnected: false,
    oracConnected: false,
    params: [
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {}
    ],
    text: [
      '',
      '',
      '',
      ''
    ],
    selectText: null,
    module: 'Empty',
    page: 'Empty'
  },
  mutations: {
    SET_WS_CONNECTED: (state, bool) => {
      state.wsConnected = bool
    },
    SET_ORAC_CONNECTED: (state, bool) => {
      state.oracConnected = bool
    },
    SOCKET_text: (state, lineValueArray) => {
      state.text[Number(--lineValueArray[0])] = lineValueArray[1]
    },
    SOCKET_selectText: (state, lineNumber) => {
      state.selectText = --lineNumber
    },
    SOCKET_page: (state, pageName) => {
      state.page = pageName
    },
    SOCKET_module: (state, moduleName) => {
      state.module = moduleName
    },
    SOCKET_P1Desc: (state, desc) => {
      state.params[0].desc = desc
    },
    SOCKET_P1Ctrl: (state, desc) => {
      state.params[0].ctrl = desc
    },
    SOCKET_P1Value: (state, desc) => {
      state.params[0].value = desc
    },
    SOCKET_P2Desc: (state, desc) => {
      state.params[1].desc = desc
    },
    SOCKET_P2Ctrl: (state, desc) => {
      state.params[1].ctrl = desc
    },
    SOCKET_P2Value: (state, desc) => {
      state.params[1].value = desc
    },
    SOCKET_P3Desc: (state, desc) => {
      state.params[2].desc = desc
    },
    SOCKET_P3Ctrl: (state, desc) => {
      state.params[2].ctrl = desc
    },
    SOCKET_P3Value: (state, desc) => {
      state.params[2].value = desc
    },
    SOCKET_P4Desc: (state, desc) => {
      state.params[3].desc = desc
    },
    SOCKET_P4Ctrl: (state, desc) => {
      state.params[3].ctrl = desc
    },
    SOCKET_P4Value: (state, desc) => {
      state.params[3].value = desc
    },
    SOCKET_P5Desc: (state, desc) => {
      state.params[4].desc = desc
    },
    SOCKET_P5Ctrl: (state, desc) => {
      state.params[4].ctrl = desc
    },
    SOCKET_P5Value: (state, desc) => {
      state.params[4].value = desc
    },
    SOCKET_P6Desc: (state, desc) => {
      state.params[5].desc = desc
    },
    SOCKET_P6Ctrl: (state, desc) => {
      state.params[5].ctrl = desc
    },
    SOCKET_P6Value: (state, desc) => {
      state.params[5].value = desc
    },
    SOCKET_P7Desc: (state, desc) => {
      state.params[6].desc = desc
    },
    SOCKET_P7Ctrl: (state, desc) => {
      state.params[6].ctrl = desc
    },
    SOCKET_P7Value: (state, desc) => {
      state.params[6].value = desc
    },
    SOCKET_P8Desc: (state, desc) => {
      state.params[7].desc = desc
    },
    SOCKET_P8Ctrl: (state, desc) => {
      state.params[7].ctrl = desc
    },
    SOCKET_P8Value: (state, desc) => {
      state.params[7].value = desc
    }
  },
  actions: {
    socket_connect: (context) => {
      setTimeout(() => context.commit('SET_WS_CONNECTED', true), 500)
      this.a._vm.$socket.emit('OracConnect')
    },
    socket_oracConnected: (context) => {
      setTimeout(() => context.commit('SET_ORAC_CONNECTED', true), 1000)
    }
  },
  getters: {
    wsConnected: state => {
      return state.wsConnected
    },
    oracConnected: state => {
      return state.oracConnected
    },
    page: state => {
      return state.page
    },
    module: state => {
      return state.module
    },
    params: state => {
      return state.params
    },
    text: state => {
      return state.text
    },
    selectText: state => {
      return state.selectText
    }
  }
})

export default store
