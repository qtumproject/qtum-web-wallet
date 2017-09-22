<template>
  <v-card style="text-align: center" class="pb-5">
    <h3 class="display-1 pa-5">Create New Wallet</h3>
    <template v-if="step === 1">
      <v-btn large error dark @click="createWallet">Create New Wallet</v-btn>
    </template>
    <template v-else-if="step === 3">
      <p>Please remember the following words</p>
      <div>
        <v-chip label v-for="(word, index) in words" :key="index">{{word}}</v-chip>
      </div>
      <v-btn large info dark @click="checkWallet">I have remembered all. Let's check</v-btn>
    </template>
    <template v-else-if="step === 5">
      <mnemonic v-on:mnemonic="validateMnemonic"></mnemonic>
    </template>
    <password :open="passwordRequired" v-on:password="setPassword"></password>
  </v-card>
</template>

<script>
import mnemonic from '../Mnemonic'
import password from '../Password'
import webWallet from '../../webWallet'

var wallet = false
var inputPassword = ''

export default {
  data() {
    return {
      step: 1,
      passwordRequired: false,
      words: [],
      wordsContent: '',
    }
  },
  components: {
    password,
    mnemonic,
  },
  methods: {
    setPassword(password) {
      if (password == '') {
        notify.error('Password is required')
        return false
      }
      if (this.step === 2) {
        this.passwordRequired = false
        this.step = 3
        inputPassword = password
        wallet = webWallet.generateWallet(password)
        this.words = wallet.getMnemonic()
      }
      else if(this.step === 4) {
        if (inputPassword != password) {
          notify.error('This password is not same as the old one')
          return false
        }
        this.passwordRequired = false
        this.step = 5
      }
    },
    createWallet() {
      this.step = 2
      this.passwordRequired = true
    },
    checkWallet() {
      this.step = 4
      this.passwordRequired = true
    },
    validateMnemonic(mnemonic) {
      if (!wallet.validateMnemonic(mnemonic)) {
        notify.error('Those mnemonic are not same as the words you should remember')
        return false
      }
      this.$emit('created')
    }
  }
}
</script>
