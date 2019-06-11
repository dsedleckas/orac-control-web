<template>
  <ul class="list-group">
    <li class="list-group-item" v-for="(item, index) in text" :key="index" @click.stop="selectHandler(index)" :class="{ 'active': index == selectText}">{{ item }}</li>
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
      console.log(position)
    }
  }
}
</script>
