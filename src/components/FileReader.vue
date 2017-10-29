<template>
  <v-btn @click="clickBtn" :color="color">
    <slot>{{ $t('file_reader.upload') }}</slot>
    <input type="file" style="display: none;" @change="handleFiles" ref="input"/>
  </v-btn>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: ['color'],
  methods: {
    clickBtn() {
      this.$refs.input.click()
    },
    handleFiles(e) {
      let file = e.target.files[0]
      let reader = new FileReader()
      let vue = this
      reader.onload = function() {
        vue.$emit('upload', {
          content: this.result
        })
      }
      reader.readAsText(file)
    }
  }
}
</script>
