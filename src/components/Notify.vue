<template>
  <div style="position: fixed; bottom: 0px; width: 100%">
    <v-alert v-for="(info, id) in list" :key="id" error value="true">
      {{info.msg}}
    </v-alert>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    list: function() {
      return this.$root.notify.list
    }
  }
}
</script>
