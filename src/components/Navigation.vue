<template>
  <div id="navigation">
    <div class="d-flex justify-content-between w-100">
      <div class="p-1 btn-group btn-group-sm w-100" role="group">
        <button @click="prevModule()" class="btn btn-arrow btn-outline-secondary" type="button">◄</button>
        <button
          class="btn btn-outline-secondary disabled"
          style="opacity:1;"
          type="button"
        ><small>{{ module }}</small></button>
        <button @click="nextModule()" class="btn btn-arrow btn-outline-secondary" type="button">►</button>
      </div>
      <div class="p-1 btn-group btn-group-sm w-100" role="group">
        <button :class="{ 'disabled': !page }" @click="prevPage()" class="btn btn-arrow btn-outline-secondary" type="button">◄</button>
        <button
          class="btn btn-outline-secondary disabled"
          style="opacity:1;"
          type="button"
        ><small>{{ page || '-' }}</small></button>
        <button :class="{ 'disabled': !page }" @click="nextPage()" class="btn btn-arrow btn-outline-secondary" type="button">►</button>
      </div>
      <div class="p-1">
        <button
            @click="showModal = true"
            style="height:100%;"
            class="btn btn-outline-secondary"
            type="button"
        >&#9776;</button>
      </div>
    </div>
    <div v-if="showModal">
      <transition name="modal">
        <div class="modal-mask" @click="showModal = false">
          <div class="modal-wrapper">
            <div class="modal-dialog" role="document">
              <div class="modal-content" style="border:none;">
                <Menu />
                <!-- <div class="p-1 btn-group" role="group">
                  <button @click.stop="up()" class="btn btn-outline-secondary">Up</button>
                  <button @click.stop="down()" class="btn btn-outline-secondary">Down</button>
                  <button @click.stop="enter()" class="btn btn-outline-secondary">Enter</button>
                </div> -->
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
