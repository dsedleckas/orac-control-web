<template>
  <div id="navigation">
    <div class="d-flex justify-content-between flex-wrap w-100">
      <div class="p-1 btn-group" role="group">
        <button @click="prevModule()" class="btn btn-outline-secondary red" type="button">◄</button>
        <button
          class="btn btn-outline-secondary font-weight-bold disabled"
          style="width:140px;opacity:1;"
          type="button"
        >{{ module }}</button>
        <button @click="nextModule()" class="btn btn-outline-secondary red" type="button">►</button>
      </div>
      <div class="p-1 btn-group" role="group">
        <button @click="prevPage()" class="btn btn-outline-secondary red" type="button">◄</button>
        <button
          class="btn btn-outline-secondary font-weight-bold disabled"
          style="width:140px;opacity:1;"
          type="button"
        >{{ page }}</button>
        <button @click="nextPage()" class="btn btn-outline-secondary red" type="button">►</button>
      </div>
      <div class="p-1">
        <button
            @click="showModal = true"
            class="btn btn-outline-secondary font-weight-bold red"
            type="button"
        >&#9776;</button>
      </div>
    </div>
    <div v-if="showModal">
      <transition name="modal">
        <div class="modal-mask" @click="showModal = false">
          <div class="modal-wrapper">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <Menu />
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Menu from './Menu.vue'
export default {
  components: {
    Menu
  },
  data () {
    return {
      showModal: false
    }
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
  },
  computed: {
    ...mapGetters(['page', 'module'])
  }
}
</script>

<style lang="css" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.red {
  color: #ff0000;
}
</style>
