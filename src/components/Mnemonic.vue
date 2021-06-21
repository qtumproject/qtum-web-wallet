<template>
  <div>
    <p>{{ $t('mnemonic.input_words') }}</p>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs2 v-for="i in length" :key="i">
            <v-text-field
              :label="$t('mnemonic.label') + i"
              type="text"
              v-model="mnemonic[i - 1]"
              ref="mnemonicInput"
              @keydown.enter="tryInputMnemonicWords"
              @focus="focus(i - 1)"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="success" dark @click="inputMnemonicWords" :disabled="notFinishInput">{{ $t('common.confirm') }}</v-btn>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      length: 12,
      mnemonic: []
    }
  },
  computed: {
    notFinishInput() {
      return this.mnemonic.filter((word) => !!word).length !== this.length
    }
  },
  methods: {
    inputMnemonicWords() {
      this.$emit('mnemonic', this.mnemonic.join(' '))
    },
    tryInputMnemonicWords() {
      if (this.notFinishInput) {
        if (this.mnemonic[this.currentIndex]) {
          this.$refs.mnemonicInput[this.currentIndex + 1].focus()
        }
        return
      }
      this.inputMnemonicWords()
    },
    focus(index) {
      this.currentIndex = index
    }
  }
}
</script>
