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
import webWallet from 'web-wallet'

let inputMnemonic = []

export default {
  data() {
    return {
      passwordRequired: false
    }
  },
  components: {
    password,
    mnemonic,
  },
  methods: {
    restore(mnemonic) {
      inputMnemonic = mnemonic
      this.passwordRequired = true
    },
    setPassword(password) {
      this.passwordRequired = false
      if (webWallet.restoreFromMnemonic(inputMnemonic, password) == false) {
        notify.error('mnemonics_can_not_restore')
        return false
      }
      this.$emit('restored')
    }
  }
}
</script>
