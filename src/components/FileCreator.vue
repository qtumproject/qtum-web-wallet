<template>
  <div>
    <v-btn :color="color" :download="downloadName" :href="href" @click="doneClick" target="_blank">
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
  methods: {
    doneClick() {
      this.$emit('click')
    }
  },
  props: ['color', 'download', 'href']
}
</script>
