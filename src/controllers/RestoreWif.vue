<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ $t('restore_wif.title') }}</span>
    </v-card-title>
    <v-card-text>
      <v-layout>
        <v-flex xs2>
          <v-subheader>
            {{ $t('restore_wif.priv_key') }}
          </v-subheader>
        </v-flex>
        <v-flex xs10>
          <v-text-field
            v-model="wif"
            @keydown.enter="restore"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="success" @click="restore">{{ $t('common.confirm') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import webWallet from 'libs/web-wallet'

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
      }
      catch (error) {
        this.$root.error('restore_wif_fail')
        return false
      }
      this.$emit('restored')
    }
  }
}
</script>
