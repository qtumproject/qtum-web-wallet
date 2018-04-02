<template>
  <v-layout row justify-center>
    <v-dialog v-model="showWarning" persistent max-width="50%">
      <v-card>
        <v-card-title class="headline">{{ $t('warning.title') }}</v-card-title>
        <v-card-text>
          <ol>
            <li v-for="(dummy, i) in total" v-if="hasWarning(i)">
              {{ $t('warning.list.' + i) }}
            </li>
          </ol>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="close">{{ $t('common.confirm') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import config from 'libs/config'

export default {
  data() {
    return {
      total: 6,
      showWarning: config.get('showWarning', true)
    }
  },
  methods: {
    hasWarning(i) {
      const key = 'warning.list.' + i
      return this.$t(key) !== key
    },
    close() {
      this.showWarning = false
      config.set('showWarning', this.showWarning, 86400)
    }
  }
}
</script>
