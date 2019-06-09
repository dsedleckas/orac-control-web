<template>
  <div>
    <button id="show-modal" @click="showModal = true">Show Menu</button>
      <Modal v-if="showModal" @close="showModal = false">
        <h3 slot="header">custom header</h3>
      </Modal>
    </div>
</template>

<script>
import Modal from './Modal'
export default {
  name: 'Menu',
  components: { Modal },
  data: function () {
    return {
      showModal: false
    }
  }
}
</script>

<style scoped>
</style>
