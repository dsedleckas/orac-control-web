<template>
  <ul class="list-group">
    <li
      style="height:50px;cursor:pointer;"
      class="list-group-item"
      v-for="(item, index) in text"
      :key="index"
      @click.stop="selectHandler(index)"
    >{{ item }}</li>
    <div class="p-1 btn-group" role="group">
      <button @click.stop="up()" class="btn btn-outline-secondary">Up</button>
      <button @click.stop="down()" class="btn btn-outline-secondary">Down</button>
      <!-- <button @click.stop="enter()" class="btn btn-outline-secondary">Enter</button> -->
    </div>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['text', 'selectText'])
  },
  methods: {
    selectHandler (position) {
      if (!this.text[position]) {
        return
      }
      const diff = position - this.selectText
      const steps = Math.abs(diff)
      if (diff < 0) {
        for (let i = 0; i < steps; i++) {
          this.$socket.emit('/NavPrev', 1)
        }
      } else if (diff > 0) {
        for (let i = 0; i < steps; i++) {
          this.$socket.emit('/NavNext', 1)
        }
      }
      this.$socket.emit('/NavActivate', 1)
    },
    up () {
      for (let i = 0; i <= this.selectText; i++) {
        this.$socket.emit('/NavPrev', 1)
      }
    },
    down () {
      for (let i = 0; i < (5 - this.selectText); i++) {
        this.$socket.emit('/NavNext', 1)
      }
    }
    // enter () {
    //   this.$socket.emit('/NavActivate', 1)
    // }
  }
}
</script>
