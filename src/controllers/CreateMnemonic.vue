<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ $t("create_mnemonic.title") }}</span>
    </v-card-title>
    <v-card-text v-if="[3, 5].includes(step)">
      <template v-if="step === 3">
        <p>{{ $t("create_mnemonic.remember") }}</p>
        <div>
          <v-chip label v-for="(word, index) in words" :key="index">{{
            word
          }}</v-chip>
        </div>
      </template>
      <template v-else-if="step === 5">
        <mnemonic @mnemonic="validateMnemonic"></mnemonic>
      </template>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="error" dark @click="createWallet" v-if="step === 1">{{
        $t("create_mnemonic.title")
      }}</v-btn>
      <v-btn color="info" dark @click="checkWallet" v-if="step === 3">{{
        $t("create_mnemonic.remembered")
      }}</v-btn>
    </v-card-actions>
    <password :open="passwordRequired" @password="setPassword"></password>
  </v-card>
</template>

<script>
import mnemonic from '@/components/Mnemonic'
import password from '@/components/Password'
import webWallet from '@/libs/web-wallet'
import track from '@/libs/track'

export default {
  data() {
    return {
      step: 1,
      passwordRequired: false,
      inputPassword: '',
      words: [],
      wallet: false
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
    mnemonic
  },
  methods: {
    setPassword(password) {
      if (this.step === 2) {
        this.passwordRequired = false
        this.step = 3
        this.inputPassword = password
        const mnemonic = webWallet.generateMnemonic()
        this.wallet = webWallet.restoreFromMnemonic(mnemonic, password)
        this.words = mnemonic.split(' ')
        track.trackStep('create_from_mnemonic', 2, 3)
      } else if (this.step === 4) {
        if (this.inputPassword !== password) {
          this.$root.error('password_is_not_same_as_the_old_one')
          return false
        }
        this.passwordRequired = false
        this.step = 5
        track.trackStep('create_from_mnemonic', 4, 5)
      }
    },
    createWallet() {
      this.step = 2
      this.passwordRequired = true
      track.trackStep('create_from_mnemonic', 1, 2)
    },
    checkWallet() {
      this.step = 4
      this.passwordRequired = true
      track.trackStep('create_from_mnemonic', 3, 4)
    },
    validateMnemonic(mnemonic) {
      if (!this.wallet.validateMnemonic(mnemonic, this.inputPassword)) {
        this.$root.error('mnemonics_are_not_same_as_the_words_should_remember')
        return false
      }
      track.trackDone('create_from_mnemonic')
      this.$emit('created')
    }
  }
}
</script>
