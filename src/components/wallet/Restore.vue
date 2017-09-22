<template>
  <v-card class="pa-5" style="text-align: center">
    <h3 class="display-1 pa5">Restore Wallet</h3>
    <mnemonic v-on:mnemonic="restore"></mnemonic>
    <password :open="passwordRequired" v-on:password="setPassword"></password>
  </v-card>
</template>

<script>
import mnemonic from '../Mnemonic'
import password from '../Password'
import webWallet from '../../webWallet'

var inputMnemonic = []

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
    restore: function(mnemonic) {
      inputMnemonic = mnemonic
      this.passwordRequired = true
    },
    setPassword: function(password) {
      this.passwordRequired = false
      if(webWallet.restoreFromMnemonic(inputMnemonic, password) == false) {
        notify.error('The mnemonic can not restore a wallet, please check and input again')
        return false
      }
      this.$emit('restored')
    }
  }
}
</script>
