
<template>
  <div id="app">
    <OracConnection />
    <Menu />
    <OracParameterControl  :prefix="'/P1'" />
  </div>
</template>

<script>
import Menu from './components/Menu.vue'
import HelloWorld from './components/HelloWorld.vue'
import OracConnection from './components/OracConnection.vue'
import PieControl from './components/PieControl.vue'
import OracParameterControl from './components/OracParameterControl.vue'
export default {
  components: { HelloWorld, OracConnection, PieControl, Menu, OracParameterControl },
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
