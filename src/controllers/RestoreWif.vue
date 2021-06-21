<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ $t("restore_wif.title") }}</span>
    </v-card-title>
    <v-card-text>
      <v-layout>
        <v-flex xs2>
          <v-subheader>
            {{ $t("restore_wif.priv_key") }}
          </v-subheader>
        </v-flex>
        <v-flex xs10>
          <v-text-field
            v-model.trim="wif"
            @keydown.enter="restore"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="success" @click="restore">{{ $t("common.confirm") }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import webWallet from '@/libs/web-wallet'
import track from '@/libs/track'

export default {
  data() {
    return {
      wif: ''
    }
  },
  methods: {
    restore() {
      try {
        webWallet.restoreFromWif(this.wif)
      } catch (e) {
        this.$root.error('restore_wif_fail')
        this.$root.log.error(
          'restore_wif_restore_error',
          e.stack || e.toString() || e
        )
        return false
      }
      track.trackDone('restore_from_wif')
      this.$emit('restored')
    }
  }
}
</script>
