<template>
  <div v-if="description" class="param-block">
        <div class="d-flex justify-content-between">
            <div class="param-text small font-weight-bold">{{description}}</div>
            <div class="param-text small font-weight-bold">{{value}}</div>
        </div>
        <PieControl :prefix="prefix" />
    </div>
</template>

<script>
import PieControl from './PieControl'
export default {
  name: 'OracParameterControl',
  components: { PieControl },
  props: {
    prefix: {
      type: String,
      required: true
    }
  },
  computed: {
    valueAddress: function () { return this.prefix + 'Value' },
    descAddress: function () { return this.prefix + 'Desc' }
  },
  created () {
    this.sockets.subscribe(this.valueAddress, (data) => { this.value = data })
    this.sockets.subscribe(this.descAddress, (data) => { this.description = data })
  },
  data () {
    return {
      description: 'Rate',
      value: '1Hz'
    }
  },
  methods: {
    handleUpdate (event) {
      console.log(event)
    }
  }
}
</script>
