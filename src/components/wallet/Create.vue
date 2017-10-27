<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ $t('create.title') }}</span>
    </v-card-title>
    <v-card-text v-if="[3, 5].includes(step)">
      <template v-if="step === 3">
        <p>{{ $t('create.remember') }}</p>
        <div>
          <v-chip label v-for="(word, index) in words" :key="index">{{word}}</v-chip>
        </div>
      </template>
      <template v-else-if="step === 5">
        <mnemonic @mnemonic="validateMnemonic"></mnemonic>
      </template>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="error" dark @click="createWallet" v-if="step === 1">{{ $t('create.title') }}</v-btn>
      <v-btn color="info" dark @click="checkWallet" v-if="step === 3">{{ $t('create.remembered') }}</v-btn>
    </v-card-actions>
    <password :open="passwordRequired" @password="setPassword"></password>
  </v-card>
</template>

<script>
import mnemonic from 'components/Mnemonic'
import password from 'components/Password'
import webWallet from 'web-wallet'

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
  props: ['view'],
  watch: {
    view: function() {
      this.step = 1
    }
  },
  components: {
    password,
    mnemonic,
  },
  methods: {
    setPassword(password) {
      if (password == '') {
        this.$root.error('password is_required')
        return false
      }
      if (this.step === 2) {
        this.passwordRequired = false
        this.step = 3
        inputPassword = password
        wallet = webWallet.generateWallet(password)
        this.words = wallet.getMnemonic()
      }
      else if (this.step === 4) {
        if (inputPassword != password) {
          this.$root.error('password_is_not_same_as_the_old_one')
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
        this.$root.error('mnemonics_are_not_same_as_the_words_should_remember')
        return false
      }
      this.$emit('created')
    }
  }
}
</script>
