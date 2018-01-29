<template>
  <div>
    <v-btn :color="color" :download="downloadName" :href="href" target="_blank">
      <slot>{{ $t('file_creator.download') }}</slot>
    </v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  computed: {
    downloadName() {
      return this.download ? this.download : (new Date()).getTime()
    }
  },
  props: ['color', 'download', 'href'],
}
</script>
