<template>
  <div class="param-block">
        <div class="d-flex justify-content-between">
            <div class="param-text small font-weight-bold">{{ desc }}</div>
            <div class="param-text small font-weight-bold">{{ value }}</div>
        </div>
        <PieControl v-if="desc" :prefix="prefix" />
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
    desc () {
      return this.$store.getters.getParamField(this.prefix, 'Desc')
    },
    value () {
      return this.$store.getters.getParamField(this.prefix, 'Value')
    }
  }
}
</script>
