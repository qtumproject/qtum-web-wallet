<template>
  <v-layout row justify-center>
    <v-dialog v-model="showWarning" persistent max-width="50%">
      <v-card>
        <v-card-title class="headline">{{ $t("warning.title") }}</v-card-title>
        <v-card-text>
          <ol>
            <li v-for="(_, i) in warningTotal" :key="i">
              {{ $t("warning.list." + i) }}
            </li>
          </ol>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="close">{{
            $t("common.confirm")
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import config from '@/libs/config'

export default {
  data() {
    return {
      total: Array(6).fill(0),
      showWarning: config.get('showWarning', true)
    }
  },
  computed: {
    warningTotal: function () {
      return this.total.filter((_, i) => {
        const key = 'warning.list.' + i
        return this.$t(key) !== key
      })
    }
  },
  methods: {
    close() {
      this.showWarning = false
      config.set('showWarning', this.showWarning, 86400)
    }
  }
}
</script>
