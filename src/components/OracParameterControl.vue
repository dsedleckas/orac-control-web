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
    },
    description: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  }
}
</script>
