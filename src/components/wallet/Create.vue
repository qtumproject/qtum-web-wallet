<template>
  <v-card style="text-align: center" class="pb-5" v-if="step === 1">
    <h3 class="display-1 pa-5">Create New Wallet</h3>
    <v-btn large error dark @click="createWallet">Create New Wallet</v-btn>
  </v-card>
  <v-card class="pa-5" v-else-if="step === 2">
    <p>Please remember the following words.</p>
    <div class="words">
      <span class="mr-3" v-for="word in words">{{word}}</span>
    </div>
    <v-btn large success dark @click="repeatMnemonic">I have saved them</v-btn>
  </v-card>
  <v-card class="pa-5" v-else-if="step === 3">
    <p class="title">Please repeat the words you saved</p>
    <v-text-field v-model="wordsContent" multi-line placeholder="Enter your words..."></v-text-field>
    <v-btn large success dark @click="validateMnemonic">Test</v-btn>
  </v-card>
</template>

<script>
import bip39 from 'bip39'

export default {
  data() {
    return {
      step: 1,
      words: [],
      wordsContent: ''
    }
  },
  methods: {
    createWallet() {
      var mnemonic = bip39.generateMnemonic()
      this.words = mnemonic.split(' ')
      this.step = 2
    },
    repeatMnemonic() {
      this.step = 3
    },
    validateMnemonic() {
      var mnemonic = this.wordsContent
      if(bip39.validateMnemonic(mnemonic) == false) {
        alert('the mnemonic is wrong')
        return
      }
      var seedHex = bip39.mnemonicToSeedHex(this.words.join(' '))
      if(bip39.mnemonicToSeedHex(this.wordsContent) != seedHex) {
        alert('the mnemonic is wrong')
        return
      }
      this.$emit('wallet', seedHex)
      alert('u r success')
    }
  }
}
</script>
