<template>
  <v-btn @click="clickBtn">
    {{ btnName }}
    <input type="file" style="display: none;" @change="handleFiles" ref="input"/>
  </v-btn>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: ['name'],
  computed: {
    btnName() {
      return this.name || this.$t('file_reader.upload')
    }
  },
  methods: {
    clickBtn() {
      this.$refs.input.click()
    },
    handleFiles(e) {
      let file = e.target.files[0]
      let reader = new FileReader()
      let vue = this
      reader.onload = function() {
        vue.$emit('file', {
          content: this.result
        })
      }
      reader.readAsText(file)
    }
  }
}
</script>
