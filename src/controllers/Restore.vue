<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ $t('restore.title') }}</span>
    </v-card-title>
    <v-card-text>
      <mnemonic @mnemonic="restore"></mnemonic>
    </v-card-text>
    <password :open="passwordRequired" @password="setPassword"></password>
  </v-card>
</template>

<script>
import mnemonic from 'components/Mnemonic'
import password from 'components/Password'
import webWallet from 'libs/web-wallet'

export default {
  data() {
    return {
      passwordRequired: false,
      inputMnemonic: []
    }
  },
  components: {
    password,
    mnemonic,
  },
  methods: {
    restore(mnemonic) {
      this.inputMnemonic = mnemonic
      if (!webWallet.validateBip39Mnemonic(this.inputMnemonic)) {
        if (!confirm(this.$t('restore.mnemonic_warning'))) return false
      }
      this.passwordRequired = true
    },
    setPassword(password) {
      this.passwordRequired = false
      if (!webWallet.restoreFromMnemonic(this.inputMnemonic, password)) {
        this.$root.error('mnemonics_can_not_restore')
        return false
      }
      this.$emit('restored')
    }
  }
}
</script>
