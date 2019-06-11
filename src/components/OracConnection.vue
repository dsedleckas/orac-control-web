<template>
  <div class="form-inline">
        <div class="text-center w-100 mb-3">
            <h1 class="font-weight-bold">ORAC 2.0</h1>
        </div>
        <div class="input-group mb-3 mx-2">
            <div class="input-group-prepend">
                <span class="input-group-text">IP</span>
            </div>
            <input v-model="oracIp" placeholder="Ip" type="text" aria-label="IP" class="form-control" style="width: 130px;" />
            <input v-model="oracPort" placeholder="Port" type="text" aria-label="Port" class="form-control" style="width: 80px;" />
        </div>

        <div class="input-group mb-3 mx-2">
            <div class="input-group-prepend">
                <span class="input-group-text">Listener</span>
            </div>
            <input v-model="listenPort" placeholder="Port" type="text" aria-label="Port" class="form-control" style="width: 80px;" />
        </div>
        <button v-on:click="connectOrac()" class="btn btn-danger mb-3 mx-2" type="button">
            <span>Connect</span>
        </button>
    </div>
</template>

<script>
export default {
  name: 'OracConnection',
  data () {
    return {
      oracIp: '192.168.1.69',
      oracPort: '6100',
      listenPort: '6009'
    }
  },
  methods: {
    connectOrac () {
      this.$socket.emit(
        '/Connect',
        {
          oracIp: this.oracIp,
          oracPort: this.oracPort,
          listenPort: this.listenPort
        })
    }
  }
}
</script>
