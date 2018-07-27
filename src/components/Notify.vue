<template>
  <div style="position: fixed; bottom: 0px; width: 100%; z-index: 10000">
    <v-alert v-for="(info, id) in list" :key="id" :color="info.type" v-model="info.show" dismissible>
      <template v-if="info.isHtml">
        <span v-html="info.msg"></span>
      </template>
      <template v-else>
        {{ info.msg }}
      </template>
    </v-alert>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  computed: {
    list: function() {
      return this.$root.notifyList
    }
  }
}
</script>
