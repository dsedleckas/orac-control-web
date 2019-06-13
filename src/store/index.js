import Vue from 'vue'
import Vuex from 'vuex'
import 'es6-promise/auto'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    wsConnected: false,
    oracConnected: false,
    P1Desc: '',
    P1Value: '',
    P1Ctrl: '',
    P2Desc: '',
    P2Value: '',
    P2Ctrl: '',
    P3Desc: '',
    P3Value: '',
    P3Ctrl: '',
    P4Desc: '',
    P4Value: '',
    P4Ctrl: '',
    P5Desc: '',
    P5Value: '',
    P5Ctrl: '',
    P6Desc: '',
    P6Value: '',
    P6Ctrl: '',
    P7Desc: '',
    P7Value: '',
    P7Ctrl: '',
    P8Desc: '',
    P8Value: '',
    P8Ctrl: '',
    text: [
      '',
      '',
      '',
      ''
    ],
    selectText: null,
    module: 'Ask Mark',
    page: 'Ask Mark'
  },
  mutations: {
    SET_WS_CONNECTED: (state, bool) => {
      state.wsConnected = bool
    },
    SET_ORAC_CONNECTED: (state, bool) => {
      state.oracConnected = bool
    },
    SET_PARAM_FIELD: (state, nameFieldValueArray) => {
      state[nameFieldValueArray[0] + nameFieldValueArray[1]] = nameFieldValueArray[2]
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
      console.log('Page', pageName)
      if (!pageName) {
        state.page = 'Empty'
      } else {
        state.page = pageName
      }
    },
    SOCKET_module: (state, moduleName) => {
      state.module = moduleName
    }
  },
  actions: {
    socket_connect: (context) => {
      setTimeout(() => context.commit('SET_WS_CONNECTED', true), 2000)
      this.a._vm.$socket.emit('OracConnect')
    },
    socket_oracConnected: (context) => {
      setTimeout(() => context.commit('SET_ORAC_CONNECTED', true), 1000)
    },
    socket_P1Desc: (context, desc) => {
      context.commit('SET_PARAM_FIELD', ['P1', 'Desc', desc])
    },
    socket_P1Ctrl: (context, ctrl) => {
      context.commit('SET_PARAM_FIELD', ['P1', 'Ctrl', ctrl])
    },
    socket_P1Value: (context, value) => {
      context.commit('SET_PARAM_FIELD', ['P1', 'Value', value])
    },
    socket_P2Desc: (context, desc) => {
      context.commit('SET_PARAM_FIELD', ['P2', 'Desc', desc])
    },
    socket_P2Ctrl: (context, ctrl) => {
      context.commit('SET_PARAM_FIELD', ['P2', 'Ctrl', ctrl])
    },
    socket_P2Value: (context, value) => {
      context.commit('SET_PARAM_FIELD', ['P2', 'Value', value])
    },
    socket_P3Desc: (context, desc) => {
      context.commit('SET_PARAM_FIELD', ['P3', 'Desc', desc])
    },
    socket_P3Ctrl: (context, ctrl) => {
      context.commit('SET_PARAM_FIELD', ['P3', 'Ctrl', ctrl])
    },
    socket_P3Value: (context, value) => {
      context.commit('SET_PARAM_FIELD', ['P3', 'Value', value])
    },
    socket_P4Desc: (context, desc) => {
      context.commit('SET_PARAM_FIELD', ['P4', 'Desc', desc])
    },
    socket_P4Ctrl: (context, ctrl) => {
      context.commit('SET_PARAM_FIELD', ['P4', 'Ctrl', ctrl])
    },
    socket_P4Value: (context, value) => {
      context.commit('SET_PARAM_FIELD', ['P4', 'Value', value])
    },
    socket_P5Desc: (context, desc) => {
      context.commit('SET_PARAM_FIELD', ['P5', 'Desc', desc])
    },
    socket_P5Ctrl: (context, ctrl) => {
      context.commit('SET_PARAM_FIELD', ['P5', 'Ctrl', ctrl])
    },
    socket_P5Value: (context, value) => {
      context.commit('SET_PARAM_FIELD', ['P5', 'Value', value])
    },
    socket_P6Desc: (context, desc) => {
      context.commit('SET_PARAM_FIELD', ['P6', 'Desc', desc])
    },
    socket_P6Ctrl: (context, ctrl) => {
      context.commit('SET_PARAM_FIELD', ['P6', 'Ctrl', ctrl])
    },
    socket_P6Value: (context, value) => {
      context.commit('SET_PARAM_FIELD', ['P6', 'Value', value])
    },
    socket_P7Desc: (context, desc) => {
      context.commit('SET_PARAM_FIELD', ['P7', 'Desc', desc])
    },
    socket_P7Ctrl: (context, ctrl) => {
      context.commit('SET_PARAM_FIELD', ['P7', 'Ctrl', ctrl])
    },
    socket_P7Value: (context, value) => {
      context.commit('SET_PARAM_FIELD', ['P7', 'Value', value])
    },
    socket_P8Desc: (context, desc) => {
      context.commit('SET_PARAM_FIELD', ['P8', 'Desc', desc])
    },
    socket_P8Ctrl: (context, ctrl) => {
      context.commit('SET_PARAM_FIELD', ['P8', 'Ctrl', ctrl])
    },
    socket_P8Value: (context, value) => {
      context.commit('SET_PARAM_FIELD', ['P8', 'Value', value])
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
    text: state => {
      return state.text
    },
    selectText: state => {
      return state.selectText
    },
    getParamField: (state) => (param, field) => {
      return state[param + field]
    }
  }
})

export default store
