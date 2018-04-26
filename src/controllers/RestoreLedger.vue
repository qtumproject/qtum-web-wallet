<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ $t('restore_ledger.title') }}</span>
    </v-card-title>
    <v-card-text>
      <template v-if="step === 1">
        <v-alert color="info" value="true">
          {{ $t('restore_ledger.usage') }}
        </v-alert>
        <a href="https://www.ledgerwallet.com/apps/manager" target="_blank">{{ $t('restore_ledger.download') }}</a>
      </template>
      <template v-if="step === 2">
        <derive-path :ledger="ledger" @setWallet="setWallet"></derive-path>
      </template>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="error" dark @click="connect" v-if="step === 1">{{ $t('restore_ledger.connect') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import webWallet from 'libs/web-wallet'
import DerivePath from 'components/DerivePath'

export default {
  data() {
    return {
      step: 1,
      ledger: null
    }
  },
  components: {
    DerivePath,
  },
  methods: {
    async connect() {
      try {
        this.ledger = await webWallet.connectLedger()
      }
      catch (e) {
        this.$root.error('connect_ledger_fail')
        this.$root.log.error('restore_ledger_connect_error', e.stack || e.toString() || e)
        return false
      }
      this.step = 2
    },
    setWallet(wallet) {
      webWallet.setWallet(wallet)
      this.$emit('restored')
    }
  }
}
</script>
