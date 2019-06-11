
<template>
  <div id="app">
    <div v-if="oracConnected" id="connected">
      <Navigation />
      <div class="params-container">
        <OracParameterControl v-for="(param, index) in params" :key="index" :description="String(param.desc || '')" :value="String(param.value || '')" :prefix="'/P' + ++index" />
      </div>
    </div>
    <div v-else class="container-centered text-center" id="connecting">
      <img class="logo" v-bind:src="'/static/logo.png'">
      <strong v-if="wsConnected">Looking for MEC Service...</strong>
      <strong v-else>Looking for OSC Service...</strong>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navigation from './components/Navigation.vue'
import PieControl from './components/PieControl.vue'
import OracParameterControl from './components/OracParameterControl.vue'
export default {
  components: {
    PieControl,
    Navigation,
    OracParameterControl
  },
  computed: {
    ...mapGetters([
      'wsConnected',
      'oracConnected',
      'params'
    ])
  }
}
</script>
