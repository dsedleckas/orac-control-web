
<template>
  <div id="app">
    <div v-if="wsConnected" id="ws-connected">
      <div v-if="oracConnected" id="orac-connected">
        <Navigation />
        <div class="params-container">
          <div class="params-columns text-center">
            <OracParameterControl :prefix="'/P1'" />
            <OracParameterControl :prefix="'/P2'" />
            <OracParameterControl :prefix="'/P3'" />
            <OracParameterControl :prefix="'/P4'" />
            <OracParameterControl :prefix="'/P5'" />
            <OracParameterControl :prefix="'/P6'" />
            <OracParameterControl :prefix="'/P7'" />
            <OracParameterControl :prefix="'/P8'" />
          </div>
        </div>
      </div>
      <div v-else class="container-centered">
        <transition name="appear">
          <strong>Waiting for Mec Service...</strong>
        </transition>
      </div>
    </div>
    <div v-else class="container-centered">
      <transition name="appear">
        <strong>Waiting for Orac Bridge...</strong>
      </transition>
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
      'oracConnected'
    ])
  }
}
</script>
