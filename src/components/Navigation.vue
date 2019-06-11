<template>
  <div class="d-flex justify-content-between flex-wrap w-100">
    <div class="p-1 btn-group" role="group">
      <button @click="prevModule()" class="btn btn-outline-secondary" type="button">◄</button>
      <button class="btn btn-outline-secondary disabled" style="width:140px;opacity:1;" type="button">Slot:Module</button>
      <button @click="nextModule()" class="btn btn-outline-secondary" type="button">►</button>
    </div>
    <div class="p-1 btn-group" role="group">
      <button @click="prevPage()" class="btn btn-outline-secondary" type="button">◄</button>
      <button class="btn btn-outline-secondary disabled" style="width:140px;opacity:1;" type="button">Page</button>
      <button @click="nextPage()" class="btn btn-outline-secondary" type="button">►</button>
    </div>
    <div class="p-1 modal-container">
      <input id="modal-toggle" type="checkbox" bind="@ShowMenu">
      <label
        class="btn btn-outline-secondary"
        style="margin-bottom:0;cursor:pointer;"
        for="modal-toggle"
      >Menu</label>
      <label class="modal-backdrop" for="modal-toggle"></label>
      <div class="modal-content" style="border:none;">
        <label class="modal-close" style="display:none;" for="modal-toggle">&#x2715;</label>
        <Menu/>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from './Menu.vue'
export default {
  components: {
    Menu
  },
  methods: {
    nextPage () {
      this.$socket.emit('/PageNext', 1)
    },
    prevPage () {
      this.$socket.emit('/PagePrev', 1)
    },
    nextModule () {
      this.$socket.emit('/ModuleNext', 1)
    },
    prevModule () {
      this.$socket.emit('/ModulePrev', 1)
    }
  }
}
</script>
