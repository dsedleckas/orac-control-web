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
      console.log('orac connected!', bool)
      state.oracConnected = bool
    },
    SOCKET_ORAC_CONNECTED: (state, bool) => {
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
      Vue.set(state.params, 0, {desc, ...state.params[0]})
    },
    SOCKET_P1Ctrl: (state, ctrl) => {
      Vue.set(state.params, 0, {ctrl, ...state.params[0]})
    },
    SOCKET_P1Value: (state, value) => {
      Vue.set(state.params, 0, {value, ...state.params[0]})
    },
    SOCKET_P2Desc: (state, desc) => {
      Vue.set(state.params, 1, {desc, ...state.params[1]})
    },
    SOCKET_P2Ctrl: (state, ctrl) => {
      Vue.set(state.params, 1, {ctrl, ...state.params[1]})
    },
    SOCKET_P2Value: (state, value) => {
      Vue.set(state.params, 1, {value, ...state.params[1]})
    },
    SOCKET_P3Desc: (state, desc) => {
      Vue.set(state.params, 2, {desc, ...state.params[2]})
    },
    SOCKET_P3Ctrl: (state, ctrl) => {
      Vue.set(state.params, 2, {ctrl, ...state.params[2]})
    },
    SOCKET_P3Value: (state, value) => {
      Vue.set(state.params, 2, {value, ...state.params[2]})
    },
    SOCKET_P4Desc: (state, desc) => {
      Vue.set(state.params, 3, {desc, ...state.params[3]})
    },
    SOCKET_P4Ctrl: (state, ctrl) => {
      Vue.set(state.params, 3, {ctrl, ...state.params[3]})
    },
    SOCKET_P4Value: (state, value) => {
      Vue.set(state.params, 3, {value, ...state.params[3]})
    },
    SOCKET_P5Desc: (state, desc) => {
      Vue.set(state.params, 4, {desc, ...state.params[4]})
    },
    SOCKET_P5Ctrl: (state, ctrl) => {
      Vue.set(state.params, 4, {ctrl, ...state.params[4]})
    },
    SOCKET_P5Value: (state, value) => {
      Vue.set(state.params, 4, {value, ...state.params[4]})
    },
    SOCKET_P6Desc: (state, desc) => {
      Vue.set(state.params, 5, {desc, ...state.params[5]})
    },
    SOCKET_P6Ctrl: (state, ctrl) => {
      Vue.set(state.params, 5, {ctrl, ...state.params[5]})
    },
    SOCKET_P6Value: (state, value) => {
      Vue.set(state.params, 5, {value, ...state.params[5]})
    },
    SOCKET_P7Desc: (state, desc) => {
      Vue.set(state.params, 6, {desc, ...state.params[6]})
    },
    SOCKET_P7Ctrl: (state, ctrl) => {
      Vue.set(state.params, 6, {ctrl, ...state.params[6]})
    },
    SOCKET_P7Value: (state, value) => {
      Vue.set(state.params, 6, {value, ...state.params[6]})
    },
    SOCKET_P8Desc: (state, desc) => {
      Vue.set(state.params, 7, {desc, ...state.params[7]})
    },
    SOCKET_P8Ctrl: (state, ctrl) => {
      Vue.set(state.params, 7, {ctrl, ...state.params[7]})
    },
    SOCKET_P8Value: (state, value) => {
      Vue.set(state.params, 7, {value, ...state.params[7]})
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
