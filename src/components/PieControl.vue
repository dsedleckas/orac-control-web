<template>
  <div class="noselect">
    <svg viewBox="0 0 160 130" ref="svg">
      <g :transform="translate">
        <path :d="drawArc(0)" fill="#ff0000" stroke="black"></path>
        <path :d="drawArc(1)" fill="#f3f3f3" stroke="black"></path>
        <text text-anchor="middle">{{ (this.value * 100).toFixed(0) }}</text>
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'PieControl',
  props: {
    radius: {
      type: Number,
      default: 70
    },
    prefix: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      angleStart: Math.PI * 2.0 / 3.0,
      margin: 10,
      value: 0.45
    }
  },
  computed: {
    ctrlAddress: function () { return this.prefix + 'Ctrl' },
    input: function () {
      return {
        a: this.value,
        b: 1 - this.value
      }
    },
    translate: function () {
      return 'translate(' + (this.margin + this.radius) + ',' + (this.margin + this.radius) + ')'
    },
    arcs: function () {
      return d3.pie()
        .sort(null)
        .value(function (d) { return d.value })
        .startAngle(-this.angleStart)
        .endAngle(this.angleStart)(d3.entries(this.input))
    }
  },
  created () {
    this.sockets.subscribe(this.ctrlAddress, (data) => { this.value = data })
  },
  mounted: function () {
    d3.select(this.$refs.svg)
      .on('mousemove', this.mouseHandle)
      .on('mousedown', this.mouseHandle)
      .on('touchstart', this.touchHandle)
      .on('touchmove', this.touchHandle)
  },
  methods: {
    drawArc: function (idx) {
      return d3.arc()
        .innerRadius(this.radius * 0.6)
        .outerRadius(this.radius)(this.arcs[idx])
    },
    touchHandle: function (d, i) {
      d3.event.preventDefault()
      d3.event.stopPropagation()
      var node = d3.select(this.$refs.svg).node()
      var bbox = node.getBBox()
      var touch = d3.touches(node)
      var x = touch[0][0] - bbox.x - (bbox.width / 2)
      var y = -touch[0][1] + bbox.y + this.radius
      this.updateValueByCursor(x, y)
    },
    mouseHandle: function (d, i) {
      if (d3.event.buttons % 2 === 1) {
        var node = d3.select(this.$refs.svg).node()
        var bbox = node.getBBox()
        var mouse = d3.mouse(node)
        var x = mouse[0] - bbox.x - (bbox.width / 2)
        var y = -mouse[1] + bbox.y + this.radius
        this.updateValueByCursor(x, y)
      }
    },
    updateValueByCursor: function (x, y) {
      var r = Math.sqrt(x * x + y * y)
      var theta = Math.atan(Math.abs(y / x))
      if (x < 0 && y > 0) { theta = Math.PI - theta }
      if (x < 0 && y < 0) { theta = Math.PI + theta }
      if (x > 0 && y < 0) { theta = 2 * Math.PI - theta }

      // change reference point
      theta = (2 * Math.PI - theta) - 1.5 * Math.PI + this.angleStart
      if (theta > 2 * Math.PI) { theta = theta - Math.PI * 2 }
      if (theta < 0) { theta = theta + Math.PI * 2 }
      if (r < this.radius && r > this.radius * 0.6) {
        if (theta <= this.angleStart * 2) {
          this.value = theta / (this.angleStart * 2)
        } else if (Math.PI * 2 - theta < Math.PI * 0.1) {
          this.value = 0.0
        } else if (theta - this.angleStart * 2 < Math.PI * 0.1) {
          this.value = 1.0
        }
        this.emitUpdate()
      }
    },
    emitUpdate () {
      this.$socket.emit(this.ctrlAddress, this.value)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
svg {
  max-height:300px;
}
path {
  stroke-width: 0px;
  opacity: 1;
}
text {
  pointer-events: none;
}
</style>
